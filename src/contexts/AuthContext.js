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
            setCurrentUser(user);
            getUserById(user.uid)
            .then((user) => {
                setUser(user[0]);
            })
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