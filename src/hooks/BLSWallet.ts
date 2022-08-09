import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { BlsWalletWrapper } from 'bls-wallet-clients';

export default function useBLSWallet(provider?: ethers.providers.Provider) {
  const [wallet, setWallet] = useState<any>();

  useEffect(
    (): any => {
      const getWallet = async () => {
        const privateKey = await localStorage.getItem('privateKey');
        if (provider && privateKey) {
          const tempWallet = await BlsWalletWrapper.connect(
            privateKey,
            '0x81Ea02723aA4097C39A79545f851490aEe4B09C8',
            provider,
          );

          setWallet(tempWallet);
        }
      };
      getWallet();
    },
    [provider],
  );

  return wallet;
}
