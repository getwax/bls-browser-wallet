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
import { setPrivateKey, useLocalStore } from './store';
import { BLS_TEAM_PK } from './constants';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const { message, setMessage } = useContext(ToastContext);
  const privateKey = useLocalStore((state) => state.privateKey);

  const query = useQuery();
  const isTeamWallet = query.get('wallet') === 'bls-team';

  useEffect(() => {
    const getAccountDetails = async () => {
      if (isTeamWallet && privateKey !== BLS_TEAM_PK) {
        setPrivateKey(BLS_TEAM_PK);
        return;
      }

      if (!privateKey) {
        const pk = await BlsAccount.generatePrivateKey();
        setPrivateKey(pk);
      }
    };

    getAccountDetails();
  }, [isTeamWallet, privateKey, setPrivateKey]);

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
