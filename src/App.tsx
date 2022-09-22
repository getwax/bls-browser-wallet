import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import './App.css';
import Header from './components/header';
import Address from './components/address';
import Send from './components/send';
import { ToastContext } from './ToastContext';
import Balance from './components/balance';
import { getAddress } from './controllers/TransactionController';
import { setAccount, setPrivateKey, useLocalStore } from './store';
import { BLS_TEAM_PK } from './constants';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const { message, setMessage } = useContext(ToastContext);
  const account = useLocalStore((state) => state.account);

  const query = useQuery();

  if (query.get('wallet') === 'bls-team' && account !== BLS_TEAM_PK) {
    setPrivateKey(BLS_TEAM_PK);
  }

  useEffect(() => {
    const getUserAddress = async () => {
      const address = await getAddress();
      setAccount(address);
    };
    getUserAddress();
  }, [setAccount]);

  useEffect(() => {
    if (message) {
      toast.info(message);
    }
    setMessage('');
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
