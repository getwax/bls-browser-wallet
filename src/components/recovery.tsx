import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import TextAddress from './textAddress';
import { createRecoveryHash } from '../controllers/TransactionController';
import { setRecoveryHash, useLocalStore } from '../store';

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
  const [address, setAddress] = useState('');
  const [salt, setSalt] = useState('');
  const recoveryHash = useLocalStore((state) => state.recoveryHash);

  const setRecovery = async () => {
    const hash = await createRecoveryHash(address, salt);
    setRecoveryHash(hash);
    setAddress('');
    setSalt('');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <TextField
              className="w-52"
              variant="filled"
              label="Salt"
              value={salt}
              onChange={(event) => setSalt(event.target.value)}
            />
            <Button
              variant="contained"
              onClick={setRecovery}
              disabled={!salt || !address}
            >
              {recoveryHash ? 'Update' : 'Set'}
              {' '}
              Recovery Hash
            </Button>
            {recoveryHash && (
              <>
                <hr />
                <p>Current recovery hash:</p>
                <TextAddress address={recoveryHash} />
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Recovery;
