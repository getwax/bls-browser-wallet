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
    rpcUrl: 'https://arb-goerli.g.alchemy.com/v2/HoMEXr6gIgxsgc1XMDiqZrXOUmHMnzMy',
    aggregatorUrl: 'https://arbitrum-goerli.blswallet.org',
    verificationGateway: '0xae7DF242c589D479A5cF8fEA681736e0E0Bb1FB9',
  },
  optimismGoerli: {
    name: 'Optimism Goerli',
    chainId: '420',
    rpcUrl: 'https://opt-goerli.g.alchemy.com/v2/hq9O2ZfBbLYPgLAIT2FDcanH2QBOy01x',
    aggregatorUrl: 'http://optimism-goerli.blswallet.org',
    verificationGateway: '0x643468269B044bA84D3F2190F601E3579d3236BB',
  },
};

export function getNetwork(networkName: string) {
  return NETWORKS[networkName];
}

export const BLS_TEAM_PK = '0x537d37082d3abe874fa3a53ea6a611b135846aa22f51226c11e84f6d814e19ab';
