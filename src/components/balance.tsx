import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { WalletContext } from '../WalletContext';
import { useOnBlock } from '../hooks';

function Balance() {
  const [balance, setBalance] = useState('');
  const { state } = useContext(WalletContext);
  const { provider, account } = state;

  useEffect(() => {
    // Get balance when account is first set or changes
    getBalance();
  }, [account]);

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
