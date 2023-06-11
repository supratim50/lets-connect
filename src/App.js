import React from 'react';
import Header from "./Layout/Header/index";
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

const App = () => {
  return (
      <div className='background'>
          
          <Routes>
            <Route path='/' element={
              <Header>
                <Home />
              </Header>
            } />
            <Route path='/profile' element={
              <Header>
                <Profile />
              </Header>
            } />
            <Route path='/login' element={
              <Header register>
                <Login />
              </Header>
            } />
            <Route path='/register' element={
              <Header register>
                <Register />
              </Header>
            } />
          </Routes>


      </div>
  )
}

export default App