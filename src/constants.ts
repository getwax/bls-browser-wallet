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
    verificationGateway: '0x3C17E9cF70B774bCf32C66C8aB83D19661Fc27E2',
  },
  arbitrumGoerli: {
    chainId: '421613',
    name: 'Arbitrum Goerli',
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    aggregatorUrl: 'https://arbitrum-goerli.blswallet.org',
    verificationGateway: '0xAf96d6e0817Ff8658f0E2a39b641920fA7fF0957',
  },
};

export function getNetwork(networkName: string) {
  return NETWORKS[networkName];
}

export const BLS_TEAM_PK = '0x537d37082d3abe874fa3a53ea6a611b135846aa22f51226c11e84f6d814e19ab';
