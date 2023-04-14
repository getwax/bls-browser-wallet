import { networks } from 'ethdk';
import { BlsNetwork } from 'ethdk/dist/src/interfaces/Network';

type NetworksType = {
  [key: string]: BlsNetwork,
};

export const NETWORKS: NetworksType = {
  localhost: networks.BLS_NETWORKS.localhost,
};

export function getNetwork(networkName: string) {
  return NETWORKS[networkName];
}

export const BLS_TEAM_PK = process.env.REACT_APP_BLS_TEAM_PK ?? '';

export const RPC_POLLING_INTERVAL = 4000;
