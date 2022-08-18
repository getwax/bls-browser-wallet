// TODO: This file was taken from the PunkWallet repo.  This could
// use some clean up and better typing.

import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import useOnBlock from './OnBlock';
import usePoller from './Poller';

/*
  ~ What it does? ~

  Gets your balance in ETH from given address and provider

  ~ How can I use? ~

  const yourLocalBalance = useBalance(localProvider, address);

  ~ Features ~

  - Provide address and get balance corresponding to given address
  - Change provider to access balance on different chains (ex. mainnetProvider)
  - If no pollTime is passed, the balance will update on every new block
*/

// const DEBUG = false;

export default function useBalance(
  provider: ethers.providers.JsonRpcProvider,
  address: string,
  pollTime = 0,
) {
  const [balance, setBalance] = useState('');

  const pollBalance = useCallback(
    async (rpcProvider?: ethers.providers.JsonRpcProvider, userAddress?: string) => {
      if (rpcProvider && userAddress) {
        const newBalance = await rpcProvider.getBalance(userAddress);
        const formattedBalance = ethers.utils.formatEther(newBalance);
        console.log(formattedBalance);
        if (formattedBalance !== balance) {
          setBalance(formattedBalance);
        }
      }
    },
    [provider, address],
  );

  // Only pass a provider to watch on a block if there is no pollTime
  useOnBlock(provider, () => {
    if (provider && address && pollTime === 0) {
      pollBalance(provider, address);
    }
  });

  // Use a poller if a pollTime is provided
  usePoller(
    async () => {
      if (provider && address && pollTime > 0) {
        console.log({ provider });
        // if (DEBUG) console.log('polling!', address);
        pollBalance(provider, address);
      }
    },
    pollTime,
    provider && address,
  );

  return balance;
}
