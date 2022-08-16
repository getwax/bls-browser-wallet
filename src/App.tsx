import React, { useContext, useEffect } from 'react';

import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import Header from './components/header';
import Address from './components/address';
import Send from './components/send';
import { ToastContext } from './ToastContext';

function App() {
  const { message, setMessage } = useContext(ToastContext);
  useEffect(() => {
    if (message) {
      toast.info(message);
    }
    setMessage('');
  }, [setMessage, message]);

  return (
    <div className="gradient min-h-screen">
      <Header />
      <div className="container mx-auto pt-24 flex flex-row flex-wrap md:flex-nowrap">
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
