import React, { useContext } from 'react';
import { Aggregator } from 'bls-wallet-clients';
import { ethers } from 'ethers';
import { useBalance } from '../hooks';
import useBLSWallet from '../hooks/BLSWallet';
import { WalletContext } from '../WalletContext';

function BlsWallet() {
  const { provider, account } = useContext(WalletContext);

  const balance = useBalance(provider, account);
  const wallet = useBLSWallet(provider);

  const sendEth = async () => {
    if (provider && wallet) {
      const nonce = (await wallet.Nonce()).toString();
      const actions = [{
        ethValue: '0x0de0b6b3a7640000',
        contractAddress: '0xDd0eeEbF38014075DeCca511E38885Cf94a5A3E5',
        encodedFunction: '0x',
      }];
      const bundle = await wallet.sign({ nonce, actions });
      const agg = new Aggregator('http://localhost:3000');
      await agg.add(bundle);
    }
  };

  return (
    <div className="bg-blue-400 rounded-xl w-1/2">
      <p>
        Eth Balance:
        {' '}
        {balance ? ethers.utils.formatEther(balance) : 0}
      </p>
      { balance && <button type="button" onClick={sendEth}>Attempt Send</button> }
    </div>
  );
}

export default BlsWallet;
