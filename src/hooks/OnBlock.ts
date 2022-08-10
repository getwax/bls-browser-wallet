// TODO: This file was taken from the PunkWallet repo.  This could
// use some clean up and better typing.

import { useEffect, useRef } from 'react';

// helper hook to call a function regularly in time intervals
const DEBUG = false;

export default function useOnBlock(provider: any, fn: any, args: any) {
  const savedCallback = useRef();
  // Remember the latest fn.
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  // Turn on the listener if we have a function & a provider
  useEffect((): any => {
    if (fn && provider) {
      const listener = (blockNumber: any) => {
        if (DEBUG) console.log(blockNumber, fn, args, provider.listeners());

        if (args && args.length > 0) {
          // @ts-ignore
          savedCallback.current(...args);
        } else {
          // @ts-ignore
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
