import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import { NETWORKS } from './constants';
import TransactionController from './controllers/TransactionController';

type WalletContextValue = {
  account?: string,
  setAccount?: any,
  provider?: ethers.providers.JsonRpcProvider,
  transactionsController?: TransactionController,
};

export const WalletContext = createContext<WalletContextValue>({
  account: '',
});

type Props = {
  children: React.ReactNode;
};

export function WalletProvider({ children } : Props) {
  const [account, setAccount] = useState<string>('');

  const targetProvider = NETWORKS.localhost;
  const localProviderUrl = targetProvider.rpcUrl;
  const provider = new ethers.providers.JsonRpcProvider(localProviderUrl);

  let privateKey = localStorage.getItem('privateKey');
  if (!privateKey) {
    privateKey = ethers.Wallet.createRandom().privateKey;
    localStorage.setItem('privateKey', privateKey);
  }

  const transactionsController = new TransactionController(provider, privateKey);

  const value = React.useMemo(() => ({
    account,
    setAccount,
    provider,
    transactionsController,
  }), [account, provider, setAccount, transactionsController]);

  return (
    // this is the provider providing state
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}
