import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { useLocalStore, useProvider } from '../store';
import { useOnBlock } from '../hooks';

function Balance() {
  const [balance, setBalance] = useState('');
  const { account, network } = useLocalStore((state) => ({
    account: state.account,
    network: state.network,
  }));
  const provider = useProvider((state) => state.provider);

  useEffect(() => {
    // Get balance when account is first set or changes
    getBalance();
  }, [account, network]);

  useOnBlock(provider, () => {
    // Get balance on a new block
    getBalance();
  });

  const getBalance = async () => {
    if (!account) {
      return;
    }
    const newBalance = await provider.getBalance(account);
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
