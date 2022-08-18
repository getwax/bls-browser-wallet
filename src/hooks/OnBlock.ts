// TODO: This file was taken from the PunkWallet repo.  This could
// use some clean up and better typing.

import { useEffect, useRef } from 'react';
import { ethers } from 'ethers';

// helper hook to call a function regularly in time intervals
// const DEBUG = false;

export default function useOnBlock(
  provider: ethers.providers.JsonRpcProvider,
  fn?: () => void,
  args: any[] = [],
) {
  const savedCallback = useRef(() => {});
  // Remember the latest fn.
  useEffect(() => {
    if (fn) {
      savedCallback.current = fn;
    }
  }, [fn]);

  // Turn on the listener if we have a function & a provider
  useEffect(() => {
    if (fn && provider) {
      const listener = () => {
        // if (DEBUG) console.log(blockNumber, fn, args, provider.listeners());

        if (args && args.length > 0) {
          // @ts-ignore
          savedCallback.current(...args);
        } else {
          savedCallback.current();
        }
      };

      provider.on('block', listener);

      return () => {
        provider.off('block', listener);
      };
    }
    return () => {};
  }, [provider]);
}
