import { ethers } from 'ethers';
import { Aggregator, BlsWalletWrapper } from 'bls-wallet-clients';

import { getNetwork } from '../constants';
import { useStore } from '../store';

export type SendTransactionParams = {
  to: string,
  from?: string,
  gas?: string,
  gasPrice?: string,
  value?: string,
  data?: string,
};

function findNetwork() {
  const { network } = useStore.getState();
  return getNetwork(network);
}

export default class TransactionController {
  constructor(
    public ethersProvider: ethers.providers.JsonRpcProvider,
  ) {}

  sendTransaction = async (
    params: SendTransactionParams[],
  ) => {
    // TODO: Implement user transaction approval
    const actions = params.map((tx) => ({
      ethValue: tx.value ?? '0',
      contractAddress: tx.to,
      encodedFunction: tx.data ?? '0x',
    }));

    const { privateKey } = useStore.getState();
    const wallet = await BlsWalletWrapper.connect(
      privateKey,
      findNetwork().verificationGateway,
      this.ethersProvider,
    );

    const nonce = (
      await BlsWalletWrapper.Nonce(
        wallet.PublicKey(),
        findNetwork().verificationGateway,
        this.ethersProvider,
      )
    ).toString();
    const bundle = await wallet.sign({ nonce, actions });

    const agg = new Aggregator(findNetwork().aggregatorUrl);
    const result = await agg.add(bundle);

    if ('failures' in result) {
      throw new Error(JSON.stringify(result));
    }

    // Todo: maybe persist known transactions?

    return result.hash;
  };

  static getTransactionReceipt = async (hash: string) => {
    const aggregator = new Aggregator(findNetwork().aggregatorUrl);
    const bundleReceipt: any = await aggregator.lookupReceipt(hash);

    return (
      bundleReceipt && {
        transactionHash: hash,
        transactionIndex: bundleReceipt.transactionIndex,
        blockHash: bundleReceipt.blockHash,
        blockNumber: bundleReceipt.blockNumber,
        logs: [],
        cumulativeGasUsed: '0x0',
        gasUsed: '0x0',
        status: '0x1',
        effectiveGasPrice: '0x0',
      }
    );
  };

  getAddress = async () => {
    const { privateKey } = useStore.getState();
    return BlsWalletWrapper.Address(
      privateKey,
      findNetwork().verificationGateway,
      this.ethersProvider,
    );
  };

  updateProvider = async () => {
    const localProviderUrl = findNetwork().rpcUrl;
    this.ethersProvider = new ethers.providers.JsonRpcProvider(localProviderUrl);
  };
}
