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
import { setAddress, setAddressAndPK, useLocalStore } from './store';
import { BLS_TEAM_PK } from './constants';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  const { message, setMessage } = useContext(ToastContext);
  const privateKey = useLocalStore((state) => state.privateKey);
  const address = useLocalStore((state) => state.address);

  const query = useQuery();

  useEffect(() => {
    const getAccountDetails = async () => {
      if (query.get('wallet') === 'bls-team' && privateKey !== BLS_TEAM_PK) {
        const newAddress = await getAddress(BLS_TEAM_PK);
        setAddressAndPK(BLS_TEAM_PK, newAddress);
        return;
      }

      if (!privateKey) {
        const pk = await BlsAccount.generatePrivateKey();
        const newAddress = await getAddress(pk);
        setAddressAndPK(pk, newAddress);
        return;
      }

      const newAddress = await getAddress();
      if (newAddress !== address) {
        setAddress(address);
      }
    };

    getAccountDetails();
  }, [setAddress]);

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
