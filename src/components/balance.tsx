import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { useLocalStore, useProvider } from '../store';
import { useOnBlock } from '../hooks';

function Balance() {
  const [balance, setBalance] = useState('');
  const { address, network } = useLocalStore((state) => ({
    address: state.address,
    network: state.network,
  }));
  const provider = useProvider((state) => state.provider);

  useEffect(() => {
    // Get balance when account is first set or changes
    getBalance();
  }, [address, network]);

  useOnBlock(provider, () => {
    // Get balance on a new block
    getBalance();
  });

  const getBalance = async () => {
    if (!address) {
      return;
    }
    const newBalance = await provider.getBalance(address);
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
