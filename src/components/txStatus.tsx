import React, { useContext } from 'react';

import { useInterval } from '../hooks';
import TransactionController from '../controllers/TransactionController';
import { ToastContext } from '../ToastContext';

type TxStatusProps = {
  setTxFinished: (txHash: string) => void,
  txHash: string,
};

// This function will accept a transaction hash and will
// fire a toast when the transaction is completed.
function TxStatus({ setTxFinished, txHash }: TxStatusProps) {
  const { setMessage } = useContext(ToastContext);

  useInterval(async () => {
    const receipt = await TransactionController.getTransactionReceipt(txHash);

    if (receipt === undefined) {
      return;
    }

    setMessage('Transaction successful');
    setTxFinished(txHash);
  }, 1000);

  return (
    <div />
  );
}

export default TxStatus;
