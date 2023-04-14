import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { useLocalStore } from '../store';
import TextAddress from './textAddress';

function Address() {
  const address = useLocalStore((state) => state.address);

  return (
    <div className="flex items-center flex-col">
      {address
        && (
          <div className="p-6 bg-white items-center flex flex-col">
            <QRCodeSVG value={address} size={256} />
            <div className="mt-4">
              <TextAddress address={address} />
            </div>
          </div>
        )}
    </div>
  );
}

export default Address;
