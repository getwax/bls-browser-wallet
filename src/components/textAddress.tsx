import React from 'react';
import { Copy } from 'phosphor-react';

function formatCompactAddress(address: string): string {
  return `0x${address.slice(2, 6)}...${address.slice(-4)}`;
}

type PropsType = {
  address: string,
};

function TextAddress({ address }: PropsType) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="flex items-center flex-col">
      <button
        type="button"
        className="text-[8pt] bg-blue-100 bg-opacity-40
              active:bg-opacity-70 cursor-pointer text-blue-600 rounded-full
              px-2 flex place-items-center gap-2 w-28"
        onClick={copyToClipboard}
        onKeyDown={(evt: { code: string }) => {
          if (['Space', 'Enter'].includes(evt.code)) {
            copyToClipboard();
          }
        }}
      >
        {formatCompactAddress(address)}
        {' '}
        <Copy className="text-[10pt]" />
      </button>
    </div>
  );
}

export default TextAddress;
