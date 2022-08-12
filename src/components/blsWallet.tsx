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
      to: '0x0e3bE91B78Ac85f05C856C4d0FB029753A4eDfd9',
    };

    await transactionsController.sendTransaction([tx]);
  };

  return (
    <div>
      <p>
        Eth Balance:
        {' '}
        {balance ? ethers.utils.formatEther(balance) : 0}
      </p>
      { balance
        && (
        <button type="button" onClick={sendEth} className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
          Send ETH
        </button>
        )}
    </div>
  );
}

export default BlsWallet;
