import React, { useContext } from 'react';

import { useInterval } from '../hooks';
import { getTransactionReceipt } from '../controllers/TransactionController';
import { ToastContext } from '../ToastContext';

type TxStatusProps = {
  setTxFinished: (txHash: string) => void,
  txHash: string,
};

// This function will accept a transaction hash and will
// fire a toast when the transaction is completed.
function TxStatus({ setTxFinished, txHash }: TxStatusProps) {
  const { setMessage } = useContext(ToastContext);
  let pollingCount = 0;

  useInterval(async () => {
    const receipt = await getTransactionReceipt(txHash);

    if (pollingCount > 14) {
      setMessage('Transaction status polling timed out');
      setTxFinished(txHash);
    }

    if (receipt === undefined) {
      pollingCount += 1;
      return;
    }

    setMessage('Transaction successful');
    setTxFinished(txHash);
  }, 4000);

  return (
    <div />
  );
}

export default TxStatus;
