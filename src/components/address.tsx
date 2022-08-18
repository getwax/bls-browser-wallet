import React, { useContext, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { WalletContext } from '../WalletContext';
import { setAccount } from '../store/actions';

function Address() {
  const {
    state, dispatch, transactionsController,
  } = useContext(WalletContext);
  const { account } = state;

  useEffect(() => {
    const getAddress = async () => {
      const address = await transactionsController.getAddress();
      setAccount(dispatch, address);
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
