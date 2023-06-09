import React from 'react';
import Header from "./Layout/Header/index";
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';

const App = () => {
  return (
      <div className='background'>
          <Header />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>


      </div>
  )
}

export default App