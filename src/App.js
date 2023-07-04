import React, { useContext, useEffect } from 'react';
import Header from "./Layout/Header/index";
import Home from './Pages/Home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { AuthContext } from './contexts/AuthContext';

const App = () => {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to={"/login"} />
    }

    return children
  }

  return (
      <div className='background'>
          
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Header>
                  <Home />
                </Header>
              </ProtectedRoute>
            } />
            <Route path='/profile/:id' element={
              <ProtectedRoute>
              <Header>
                <Profile />
              </Header>
            </ProtectedRoute>
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