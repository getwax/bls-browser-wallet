import React, { ChangeEvent, useContext, useState } from 'react';
import { ethers } from 'ethers';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import { useBalance, useTxStatus } from '../hooks';
import { WalletContext } from '../WalletContext';
import { SendTransactionParams } from '../controllers/TransactionController';

function Send() {
  const [sendAmount, setSendAmount] = useState<string>('');
  const [sendAddress, setSendAddress] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { provider, account, transactionsController } = useContext(WalletContext);

  const balance = useBalance(provider, account);
  const status = useTxStatus(provider, transactionsController, txHash);
  console.log({ status });

  const sendEth = async () => {
    setLoading(true);
    const value = ethers.utils.parseEther(sendAmount).toHexString();
    const tx: SendTransactionParams = {
      value,
      to: sendAddress,
    };

    const hash = await transactionsController.sendTransaction([tx]);

    setTxHash(hash);
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

  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-left">
          Eth Balance:
          {' '}
          {balance ? ethers.utils.formatEther(balance) : 0}
        </p>
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
    </div>
  );
}

export default Send;
