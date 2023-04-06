import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';
import { getNetwork, RPC_POLLING_INTERVAL } from './constants';

type LocalStoreType = {
  network: string,
  address: string,
  privateKey: string,
  recoverySalt: {
    [key: string]: string,
  },
};

export const useLocalStore = create<LocalStoreType, any>(
  persist(
    () => ({
      network: 'localhost',
      address: '',
      privateKey: '',
      recoverySalt: {},
    }),
    {
      name: 'persistedStorage',
    },
  ),
);

export const setPrivateKey = (privateKey: string) => useLocalStore.setState(() => ({ privateKey }));

export const setNetwork = (network: string) => {
  useLocalStore.setState(() => ({ network }));
  updateProvider();
};
export const setAddress = (address: string) => useLocalStore.setState(() => ({ address }));
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
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  provider.pollingInterval = RPC_POLLING_INTERVAL;
  return {
    provider,
  };
});

export const updateProvider = () => {
  const { network } = useLocalStore.getState();
  const { rpcUrl } = getNetwork(network);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  provider.pollingInterval = RPC_POLLING_INTERVAL;
  useProvider.setState(() => ({
    provider,
  }));
};

export const setAddressAndPK = (privateKey: string, address: string) => {
  useLocalStore.setState(() => ({ privateKey, address }));
};
