import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BlsAccount } from 'ethdk';

import './App.css';
import Header from './components/header';
import Address from './components/address';
import Send from './components/send';
import { ToastContext } from './ToastContext';
import Balance from './components/balance';
import { getAddress } from './controllers/TransactionController';
import { setAccount, setAccountAndPK, useLocalStore } from './store';
import { BLS_TEAM_PK } from './constants';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const { message, setMessage } = useContext(ToastContext);
  const privateKey = useLocalStore((state) => state.privateKey);
  const account = useLocalStore((state) => state.account);

  const query = useQuery();

  useEffect(() => {
    const getAccountDetails = async () => {
      if (query.get('wallet') === 'bls-team' && privateKey !== BLS_TEAM_PK) {
        const address = await getAddress(BLS_TEAM_PK);
        setAccountAndPK(BLS_TEAM_PK, address);
        return;
      }

      if (!privateKey) {
        const pk = await BlsAccount.generatePrivateKey();
        const address = await getAddress(pk);
        setAccountAndPK(pk, address);
        return;
      }

      const address = await getAddress();
      if (account !== address) {
        setAccount(address);
      }
    };

    getAccountDetails();
  }, [setAccount]);

  useEffect(() => {
    if (message) {
      toast.info(message);
      setMessage('');
    }
  }, [setMessage, message]);

  return (
    <div className="bg-grey-100 min-h-screen">
      <Header />
      <div className="container mx-auto pt-6">
        <Balance />
      </div>
      <div className="container mx-auto flex flex-row flex-wrap md:flex-nowrap">
        <div className="basis-1/2 rounded p-6">
          <Address />
        </div>
        <div className="basis-1/2 p-6">
          <Send />
        </div>
      </div>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={2000} hideProgressBar />
    </div>
  );
}

export default App;
