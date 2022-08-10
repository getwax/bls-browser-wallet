import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { useBalance } from '../hooks';
import { WalletContext } from '../WalletContext';
import { SendTransactionParams } from '../controllers/TransactionController';

function BlsWallet() {
  const { provider, account, transactionsController } = useContext(WalletContext);

  const balance = useBalance(provider, account);

  // TODO clean test this and make dynamic when the eth send is fixed.
  const sendEth = async () => {
    const tx: SendTransactionParams = {
      value: '0x0de0b6b3a7640000',
      to: '0xDd0eeEbF38014075DeCca511E38885Cf94a5A3E5',
    };

    await transactionsController?.sendTransaction([tx]);
  };

  return (
    <div className="bg-blue-400 rounded-xl w-1/2">
      <p>
        Eth Balance:
        {' '}
        {balance ? ethers.utils.formatEther(balance) : 0}
      </p>
      { balance && <button type="button" onClick={sendEth}>Attempt Send</button> }
    </div>
  );
}

export default BlsWallet;
