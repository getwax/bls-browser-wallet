import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';
import { createAccount } from 'ethdk';
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

export const setPrivateKey = (privateKey: string) => {
  const { network } = useLocalStore.getState();
  updateAccountData(privateKey, network);
};

export const setNetwork = (network: string) => {
  const { privateKey } = useLocalStore.getState();
  updateAccountData(privateKey, network);
};

export const updateAccountData = async (privateKey: string, network: string) => {
  const account = await createAccount({
    accountType: 'bls',
    privateKey,
    network: getNetwork(network),
  });
  useLocalStore.setState(() => ({
    network,
    address: account.address,
    privateKey,
  }));
};

export const getAccount = async () => {
  const { network, privateKey } = useLocalStore.getState();

  return createAccount({
    accountType: 'bls',
    privateKey,
    network: getNetwork(network),
  });
};

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
