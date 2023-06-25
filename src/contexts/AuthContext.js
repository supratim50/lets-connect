import React, {createContext, useEffect, useState} from 'react';
import { firebaseAuth } from '../Middleware/db/userAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserById } from '../Middleware/db/CURD';

export const AuthContext = createContext();


const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = onAuthStateChanged(firebaseAuth, user => {
            console.log(user.id)
            setCurrentUser({...user, id: user.id});
            getUserById(user.uid, setUser);
        })

        return () => {
            getUser();
        }
    }, []);

  return (
    <AuthContext.Provider value={{currentUser, user}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider