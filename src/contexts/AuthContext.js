import React, {createContext, useContext, useEffect, useState} from 'react';

import { firebaseAuth } from '../Middleware/db/userAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserById } from '../Middleware/db/CURD';
// import {UserContext} from "../contexts/UserContextProvider";

export const AuthContext = createContext();


const AuthContextProvider = ({children}) => {

    // const {userDispatch} = useContext(UserContext);

    const [currentUser, setCurrentUser] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = onAuthStateChanged(firebaseAuth, async user => {
            setCurrentUser({...user});
            if(user) {
                await getUserById(user.uid, setUser);
            }
            // setUser(userbyId);
            // userDispatch({type: "SET_USER", payload: userbyId});
            // console.log(userbyId);
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