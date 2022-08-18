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
    verificationGateway: '0xa15954659EFce154a3B45cE88D8158A02bE2049A',
  },
  arbitrumRinkeby: {
    chainId: '421611', // 42161
    name: 'Arbitrum Rinkeby',
    rpcUrl: 'https://rinkeby.arbitrum.io/rpc',
    aggregatorUrl: 'https://arbitrum-testnet.blswallet.org',
    verificationGateway: '0x697B3E6258B08201d316b31D69805B5F666b62C8',
  },
};

export function getNetwork(networkName: string) {
  return NETWORKS[networkName];
}

export const currentNetwork = 'localhost';
