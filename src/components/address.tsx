import React, { useContext, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { WalletContext } from '../WalletContext';

function Address() {
  const {
    account, setAccount, transactionsController,
  } = useContext(WalletContext);

  useEffect(() => {
    const getAddress = async () => {
      const address = await transactionsController.getAddress();
      setAccount(address);
    };
    getAddress();
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
