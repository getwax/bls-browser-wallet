import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { useLocalStore } from '../store';
import TextAddress from './textAddress';

function Address() {
  const account = useLocalStore((state) => state.account);

  return (
    <div className="flex items-center flex-col">
      {account
        && (
          <div className="p-6 bg-white items-center flex flex-col">
            <QRCodeSVG value={account} size={256} />
            <div className="mt-4">
              <TextAddress address={account} />
            </div>
          </div>
        )}
    </div>
  );
}

export default Address;
