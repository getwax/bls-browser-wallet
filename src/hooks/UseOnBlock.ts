import { useEffect, useRef } from 'react';
import { ethers } from 'ethers';

function useOnBlock(
  provider: ethers.providers.JsonRpcProvider,
  callback: () => void,
) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    provider.on('block', tick);

    return () => {
      provider.off('block', tick);
    };
    return undefined;
  }, [callback]);
}

export default useOnBlock;
