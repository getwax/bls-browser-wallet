import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';
import { getNetwork } from './constants';

export const useLocalStore = create(
  persist(
    () => ({
      network: 'localhost',
      account: '',
      privateKey: ethers.Wallet.createRandom().privateKey,
      recoveryHash: '', // TODO: make work with other multiple networks
    }),
    {
      name: 'persistedStorage',
    },
  ),
);

export const setNetwork = (network: string) => {
  useLocalStore.setState(() => ({ network }));
  updateProvider();
};
export const setAccount = (account: string) => useLocalStore.setState(() => ({ account }));
export const setRecoveryHash = (recoveryHash: string) => useLocalStore.setState(
  () => ({ recoveryHash }),
);

export const useProvider = create(() => {
  const { network } = useLocalStore.getState();
  const { rpcUrl } = getNetwork(network);
  return {
    provider: new ethers.providers.JsonRpcProvider(rpcUrl),
  };
});

export const updateProvider = () => {
  const { network } = useLocalStore.getState();
  const { rpcUrl } = getNetwork(network);
  useProvider.setState(() => ({
    provider: new ethers.providers.JsonRpcProvider(rpcUrl),
  }));
};
