import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';
import { getNetwork } from './constants';

type LocalStoreType = {
  network: string,
  account: string,
  privateKey: string,
  recoverySalt: {
    [key: string]: string,
  },
};

export const useLocalStore = create<LocalStoreType, any>(
  persist(
    () => ({
      network: 'arbitrumGoerli',
      account: '',
      privateKey: ethers.Wallet.createRandom().privateKey,
      recoverySalt: {},
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
export const setRecoverySalt = (hash: string) => {
  const { network, recoverySalt } = useLocalStore.getState();
  const newRecoverySalt = { ...recoverySalt, [network]: hash };
  useLocalStore.setState(
    () => ({ recoverySalt: newRecoverySalt }),
  );
};

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
