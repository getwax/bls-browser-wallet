import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';
import { NETWORKS } from './constants';

type WalletContextValue = {
  account?: string,
  setAccount?: any,
  provider?: ethers.providers.JsonRpcProvider,
  setProvider?: any,
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

  if (!localStorage.getItem('privateKey')) {
    const { privateKey } = ethers.Wallet.createRandom();
    localStorage.setItem('privateKey', privateKey);
  }

  const value = React.useMemo(() => ({
    account, setAccount, provider,
  }), [account, provider, setAccount]);

  return (
    // this is the provider providing state
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}
