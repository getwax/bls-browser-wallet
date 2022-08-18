import React, { useContext } from 'react';

import { WalletContext } from '../WalletContext';
import { useBalance } from '../hooks';

function Balance() {
  const { state } = useContext(WalletContext);
  const { provider, account } = state;

  const balance = useBalance(provider, account, 5000);

  return (
    <div className="flex items-center flex-col">
      <h2>ETH Balance: </h2>
      <p>
        {balance || '0.0'}
      </p>
    </div>
  );
}

export default Balance;
