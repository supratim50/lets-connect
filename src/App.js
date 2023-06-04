import React from 'react';
import Header from "./Layout/Header/index";
import Home from './Pages/Home/Home';

const App = () => {
  return (
      <div className='background'>
        <Header />
        <Home />
      </div>
  )
}

export default App