import React from 'react';
import Header from "./Layout/Header/index";
import Home from './Pages/Home/Home';

const App = () => {
  return (
      <div className='background'>
        <div className='header-nav'>
          <Header />
        </div>
        <div>
          <Home />
        </div>
      </div>
  )
}

export default App