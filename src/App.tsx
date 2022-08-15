import React from 'react';

import './App.css';
import Header from './components/header';
import Address from './components/address';
import Send from './components/send';

function App() {
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
    </div>
  );
}

export default App;
