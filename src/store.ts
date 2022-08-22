import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';

export const useStore = create(
  persist(
    () => ({
      network: 'localhost',
      account: '',
      privateKey: ethers.Wallet.createRandom().privateKey,
    }),
    {
      name: 'persistedStorage',
    },
  ),
);

export const setNetwork = (network: string) => useStore.setState(() => ({ network }));
export const setAccount = (account: string) => useStore.setState(() => ({ account }));
