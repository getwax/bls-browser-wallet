type NetworkConfigType = {
  name: string,
  chainId: string,
  rpcUrl: string,
  aggregatorUrl: string,
  verificationGateway: string,
};

type NetworksType = {
  [key: string]: NetworkConfigType,
};

export const NETWORKS: NetworksType = {
  localhost: {
    name: 'localhost',
    chainId: '31337',
    rpcUrl: 'http://localhost:8545',
    aggregatorUrl: 'http://localhost:3000',
    verificationGateway: '0x689A095B4507Bfa302eef8551F90fB322B3451c6',
  },
  arbitrumGoerli: {
    chainId: '421613',
    name: 'Arbitrum Goerli',
    rpcUrl: process.env.REACT_APP_ARBITRUM_GOERLI_RPC ?? '',
    aggregatorUrl: process.env.REACT_APP_ARBITRUM_GOERLI_AGG ?? 'https://arbitrum-goerli.blswallet.org',
    verificationGateway: '0xae7DF242c589D479A5cF8fEA681736e0E0Bb1FB9',
  },
  optimismGoerli: {
    name: 'Optimism Goerli',
    chainId: '420',
    rpcUrl: process.env.REACT_APP_OPTIMISM_GOERLI_RPC ?? '',
    aggregatorUrl: process.env.REACT_APP_OPTIMISM_GOERLI_AGG ?? 'https://optimism-goerli.blswallet.org',
    verificationGateway: '0x643468269B044bA84D3F2190F601E3579d3236BB',
  },
};

export function getNetwork(networkName: string) {
  return NETWORKS[networkName];
}

export const BLS_TEAM_PK = process.env.REACT_APP_BLS_TEAM_PK ?? '';

export const RPC_POLLING_INTERVAL = 10000;
