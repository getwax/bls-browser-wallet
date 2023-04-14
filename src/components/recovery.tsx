import React, { useContext, useState } from 'react';
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import TextAddress from './textAddress';
import { createRecoveryHash } from '../controllers/TransactionController';
import { setRecoverySalt, useLocalStore } from '../store';
import { ToastContext } from '../ToastContext';
import CopyText from './copyText';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Recovery() {
  const [open, setOpen] = useState(false);
  const [currAddress, setCurrAddress] = useState('');
  const [salt, setSalt] = useState('');
  const [saltError, setSaltError] = useState(false);
  const { setMessage } = useContext(ToastContext);
  const { recoverySalt, address } = useLocalStore((state) => ({
    recoverySalt: state.recoverySalt[state.network],
    address: state.address,
  }));

  const setRecovery = async () => {
    await createRecoveryHash(currAddress, salt);
    setRecoverySalt(salt);
    setCurrAddress('');
    setSalt('');
    setMessage('Transaction successful');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdateSalt = (newSalt: string) => {
    try {
      ethers.utils.formatBytes32String(newSalt);
      setSaltError(false);
    } catch (err) {
      setSaltError(true);
    }
    setSalt(newSalt);
  };

  return (
    <div className="ml-4 mr-4">
      <Button onClick={handleOpen} variant="contained">Recovery</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="recovery-hash"
        aria-describedby="set-recovery-hash"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-2 items-center">
            <TextField
              className="w-52"
              variant="filled"
              label="Recovery address"
              value={currAddress}
              onChange={(event) => setCurrAddress(event.target.value)}
            />
            <TextField
              error={saltError}
              className="w-52"
              variant="filled"
              label="Salt"
              value={salt}
              onChange={(event) => handleUpdateSalt(event.target.value)}
              helperText={saltError ? 'To many characters' : ''}
            />
            <Button
              variant="contained"
              onClick={setRecovery}
              disabled={!salt || !currAddress || saltError}
            >
              {recoverySalt ? 'Update' : 'Set'}
              {' '}
              Recovery Hash
            </Button>
            {recoverySalt && (
              <>
                <p>To recover this wallet, copy the below info to your Quill wallet</p>
                <div className="flex flex-row w-64 items-center">
                  <p className="mr-auto">Wallet address:</p>
                  <TextAddress address={address} />
                </div>
                <div className="flex flex-row w-64 items-center">
                  <p className="mr-auto">Salt:</p>
                  <CopyText text={recoverySalt} />
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Recovery;
