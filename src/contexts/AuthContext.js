import React, {createContext, useEffect, useState} from 'react';
import { firebaseAuth } from '../Middleware/db/userAuth';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();


const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const getUser = onAuthStateChanged(firebaseAuth, user => {
            setCurrentUser(user);
        })

        return () => {
            getUser();
        }
    }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider