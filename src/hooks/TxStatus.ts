import { useCallback, useContext, useState } from 'react';

import { ethers } from 'ethers';
import useOnBlock from './OnBlock';
import TransactionController from '../controllers/TransactionController';
import { ToastContext } from '../ToastContext';

export default function useTxStatus(
  provider: ethers.providers.JsonRpcProvider,
  txController: TransactionController,
  txHash: string,
) {
  const [status, setStatus] = useState();
  const { setMessage } = useContext(ToastContext);

  const pollTransaction = useCallback(
    async (tx: TransactionController, hash: string) => {
      const receipt = await TransactionController.getTransactionReceipt(hash);

      if (receipt === undefined) {
        return;
      }
      setMessage('Transaction successful');
      setStatus(receipt);
    },
    [txController, txHash],
  );

  useOnBlock(provider, () => {
    if (provider && txHash) {
      pollTransaction(txController, txHash);
    }
  }, []);

  return status;
}
