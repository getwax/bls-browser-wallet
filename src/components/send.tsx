import React, {
  ChangeEvent, useContext, useState,
} from 'react';
import { ethers } from 'ethers';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import { SendTransactionParams, sendTransaction } from '../controllers/TransactionController';
import { ToastContext } from '../ToastContext';
import TxStatus from './txStatus';

function Send() {
  const [sendAmount, setSendAmount] = useState<string>('');
  const [sendAddress, setSendAddress] = useState<string>('');
  const [pendingTxs, setPendingTxs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { setMessage } = useContext(ToastContext);

  const sendEth = async () => {
    setLoading(true);
    const value = ethers.utils.parseEther(sendAmount).toHexString();
    const tx: SendTransactionParams = {
      value,
      to: sendAddress,
    };

    const hash = await sendTransaction([tx]);

    setMessage('Transaction submitted');
    setPendingTxs([...pendingTxs, hash]);
    setLoading(false);
    setSendAmount('');
  };

  const updateSendAmount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (Number.isFinite(Number(value))) {
      setSendAmount(value);
    }

    return sendAmount;
  };

  const removePendingTxs = (hash: string) => {
    const newPendingTxs = pendingTxs.filter((tx) => tx !== hash);
    setPendingTxs(newPendingTxs);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <TextField
          className="w-52"
          variant="filled"
          label="To address"
          value={sendAddress}
          onChange={(event) => setSendAddress(event.target.value)}
        />
        <TextField
          className="w-52"
          variant="filled"
          label="Amount"
          value={sendAmount}
          onChange={(event) => updateSendAmount(event)}
        />
        <div>
          <LoadingButton
            type="button"
            onClick={sendEth}
            variant="outlined"
            loading={loading}
            disabled={!sendAmount || !ethers.utils.isAddress(sendAddress)}
          >
            Send ETH
          </LoadingButton>
        </div>
      </div>
      {pendingTxs.map((tx) => (
        <TxStatus setTxFinished={removePendingTxs} txHash={tx} key={tx} />
      ))}
    </div>
  );
}

export default Send;
