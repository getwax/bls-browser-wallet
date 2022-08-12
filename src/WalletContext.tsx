import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import { NETWORKS } from './constants';
import TransactionController from './controllers/TransactionController';

type WalletContextValue = ReturnType<typeof getContextValue>;

export const WalletContext = createContext<WalletContextValue>(
  // WalletProvider render will ensure this is set properly
  // before other components load.
  {} as WalletContextValue,
);

type Props = {
  children: React.ReactNode;
};

function getProvider(): ethers.providers.JsonRpcProvider {
  const targetProvider = NETWORKS.localhost;
  const localProviderUrl = targetProvider.rpcUrl;
  return new ethers.providers.JsonRpcProvider(localProviderUrl);
}

function getPrivateKey(): string {
  const PK_LOCAL_STORAGE_KEY = 'privateKey';
  let privateKey = localStorage.getItem(PK_LOCAL_STORAGE_KEY);
  if (!privateKey) {
    privateKey = ethers.Wallet.createRandom().privateKey;
    localStorage.setItem(PK_LOCAL_STORAGE_KEY, privateKey);
  }
  return privateKey;
}

function getContextValue() {
  const [account, setAccount] = useState<string>('');

  const provider = getProvider();
  const privateKey = getPrivateKey();
  const transactionsController = new TransactionController(provider, privateKey);

  return {
    account,
    setAccount,
    provider,
    transactionsController,
  };
}

export function WalletProvider({ children } : Props) {
  const {
    account,
    setAccount,
    provider,
    transactionsController,
  } = getContextValue();

  const value = React.useMemo(() => ({
    account,
    setAccount,
    provider,
    transactionsController,
  }), [
    account,
    setAccount,
    provider,
    transactionsController,
  ]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}
