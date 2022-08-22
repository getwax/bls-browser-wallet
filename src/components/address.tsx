import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { getAddress } from '../controllers/TransactionController';
import { setAccount, useLocalStore } from '../store';

function Address() {
  const account = useLocalStore((state) => state.account);

  useEffect(() => {
    const getUserAddress = async () => {
      const address = await getAddress();
      setAccount(address);
    };
    getUserAddress();
  }, [setAccount]);

  return (
    <div className="flex items-center flex-col">
      {account
        && (
          <div className="p-6 bg-white items-center flex flex-col">
            <QRCodeSVG value={account} size={256} />
            <p>{account}</p>
          </div>
        )}
    </div>
  );
}

export default Address;
