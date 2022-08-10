// TODO: This file was taken from the PunkWallet repo.  This could
// use some clean up and better typing.

import { useCallback, useState } from 'react';
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

const DEBUG = false;

export default function useBalance(provider: any, address: any, pollTime = 0) {
  const [balance, setBalance] = useState();

  const pollBalance = useCallback(
    async (providerr: any, addresss: any) => {
      if (providerr && address) {
        const newBalance = await providerr.getBalance(addresss);
        if (newBalance !== balance) {
          setBalance(newBalance);
        }
      }
    },
    [provider, address],
  );

  // Only pass a provider to watch on a block if there is no pollTime
  // @ts-ignore
  useOnBlock(pollTime === 0 && provider, () => {
    if (provider && address && pollTime === 0) {
      pollBalance(provider, address);
    }
  });

  // Use a poller if a pollTime is provided
  usePoller(
    async () => {
      if (provider && address && pollTime > 0) {
        if (DEBUG) console.log('polling!', address);
        // @ts-ignore
        pollBalance();
      }
    },
    pollTime,
    provider && address,
  );

  return balance;
}
