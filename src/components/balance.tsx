import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { WalletContext } from '../WalletContext';
import { useStore } from '../store';
import { useOnBlock } from '../hooks';

function Balance() {
  const [balance, setBalance] = useState('');
  const { transactionsController } = useContext(WalletContext);
  const { account, network } = useStore((state) => ({
    account: state.account,
    network: state.network,
  }));

  useEffect(() => {
    // Get balance when account is first set or changes
    getBalance();
  }, [account, network]);

  useOnBlock(transactionsController.ethersProvider, () => {
    // Get balance on a new block
    getBalance();
  });

  const getBalance = async () => {
    if (!account) {
      return;
    }
    const newBalance = await transactionsController.ethersProvider.getBalance(account);
    const formattedBalance = ethers.utils.formatEther(newBalance);

    if (formattedBalance !== balance) {
      setBalance(formattedBalance);
    }
  };

  return (
    <div className="flex items-center flex-col">
      <h2>ETH Balance: </h2>
      <p>
        {balance || '-'}
      </p>
    </div>
  );
}

export default Balance;
