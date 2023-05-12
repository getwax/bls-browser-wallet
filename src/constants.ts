import { networks } from 'ethdk';
import { BlsNetwork } from 'ethdk/dist/src/interfaces/Network';

type NetworksType = {
  [key: string]: BlsNetwork,
};

export const NETWORKS: NetworksType = {
  arbitrumGoerli: {
    ...networks.BLS_NETWORKS.arbitrumGoerli,
    rpcUrl: process.env.REACT_APP_ARBITRUM_GOERLI_RPC ?? '',
  },
  optimismGoerli: {
    ...networks.BLS_NETWORKS.optimismGoerli,
    rpcUrl: process.env.REACT_APP_OPTIMISM_GOERLI_RPC ?? '',
  },
};

export function getNetwork(networkName: string) {
  return NETWORKS[networkName];
}

export const BLS_TEAM_PK = process.env.REACT_APP_BLS_TEAM_PK ?? '';

export const RPC_POLLING_INTERVAL = 4000;
