import React, { createContext } from 'react';
import { ethers } from 'ethers';
import { getNetwork } from './constants';
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
  const networkName = localStorage.getItem('selectedNetwork') || 'localhost';
  const localProviderUrl = getNetwork(networkName).rpcUrl;
  return new ethers.providers.JsonRpcProvider(localProviderUrl);
}

function getContextValue() {
  const provider = getProvider();
  const transactionsController = new TransactionController(provider);

  return {
    transactionsController,
  };
}

export function WalletProvider({ children } : Props) {
  const { transactionsController } = getContextValue();

  const value = React.useMemo(() => ({ transactionsController }), [
    transactionsController,
  ]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}
