import React, { useContext, useEffect } from 'react';
import { BlsWalletWrapper } from 'bls-wallet-clients';
import { QRCodeSVG } from 'qrcode.react';

import { WalletContext } from '../WalletContext';

function Address() {
  const { provider, account, setAccount } = useContext(WalletContext);

  useEffect(() => {
    const getAddress = async () => {
      const privateKey = await localStorage.getItem('privateKey');
      if (privateKey && provider) {
        const address = await BlsWalletWrapper.Address(
          privateKey,
          '0x81Ea02723aA4097C39A79545f851490aEe4B09C8',
          provider,
        );
        setAccount(address);
      }
    };
    getAddress();
  }, [provider]);

  return (
    <div className="flex items-center flex-col">
      {account
        && <QRCodeSVG value={account} size={256} />}
      <p>
        BLS public key:
        {' '}
        {account}
      </p>
    </div>
  );
}

export default Address;
