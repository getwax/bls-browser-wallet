import React, { useState } from 'react';
import Button from '@mui/material/Button';

function CopyText({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(copyText: string) {
    return navigator.clipboard.writeText(copyText);
  }

  const handleCopyClick = () => {
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-row items-center">
      <p>{text}</p>
      <Button variant="text" onClick={handleCopyClick}>
        {isCopied ? 'Copied' : 'Copy'}
      </Button>
    </div>
  );
}

export default CopyText;
