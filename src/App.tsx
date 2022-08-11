import React from 'react';

import './App.css';
import Header from './components/header';
import Address from './components/address';
import BlsWallet from './components/blsWallet';

function App() {
  return (
    <div className="gradient min-h-screen">
      <Header />
      <div className="pt-24 flex flex-row flex-wrap md:flex-nowrap">
        <div className="basis-1/2 m-6 p-6">
          Network: localhost
        </div>
        <div className="basis-1/2 bg-white rounded m-6 p-6">
          <Address />
          <BlsWallet />
        </div>
      </div>
    </div>
  );
}

export default App;
