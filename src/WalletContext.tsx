import React, { createContext, useReducer } from 'react';
import { ethers } from 'ethers';
import { getNetwork } from './constants';
import TransactionController from './controllers/TransactionController';
import { reducer } from './store';

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

function getPrivateKey(): string {
  const PK_LOCAL_STORAGE_KEY = 'privateKey';
  let privateKey = localStorage.getItem(PK_LOCAL_STORAGE_KEY);
  if (!privateKey) {
    privateKey = ethers.Wallet.createRandom().privateKey;
    localStorage.setItem(PK_LOCAL_STORAGE_KEY, privateKey);
  }
  return privateKey;
}

// TODO: I need a cleaner state management
function getContextValue() {
  const networkName = localStorage.getItem('selectedNetwork') || 'localhost';
  const provider = getProvider();
  const privateKey = getPrivateKey();
  const transactionsController = new TransactionController(provider, privateKey);

  const initialState = {
    network: networkName,
    account: '',
    provider,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    transactionsController,
  };
}

export function WalletProvider({ children } : Props) {
  const {
    state,
    dispatch,
    transactionsController,
  } = getContextValue();

  const value = React.useMemo(() => ({
    state,
    dispatch,
    transactionsController,
  }), [
    state,
    dispatch,
    transactionsController,
  ]);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}
