import React, { useContext } from 'react';

import { useInterval } from '../hooks';
import TransactionController from '../controllers/TransactionController';
import { ToastContext } from '../ToastContext';

type TxStatusProps = {
  setTxFinished: (txHash: string) => void,
  txHash: string,
};

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
