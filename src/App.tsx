import React from 'react';

import './App.css';
import Header from './components/header';
import Address from './components/address';
import BlsWallet from './components/blsWallet';

function App() {
  return (
    <div className="gradient min-h-screen">
      <Header />
      <div className="container mx-auto pt-24 flex flex-row flex-wrap md:flex-nowrap">
        <div className="basis-1/2 bg-white rounded p-6">
          <Address />
        </div>
        <div className="basis-1/2 p-6">
          <BlsWallet />
        </div>
      </div>
    </div>
  );
}

export default App;
