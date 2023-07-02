import React, {createContext, useReducer} from 'react';
import {userReducer, USER_STATE} from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, dispatch] = useReducer(userReducer, USER_STATE);

    // const setUserData = (data) => {
    //     dispatch({type: "SET_USER", payload: data});
    // }
    // const updateProfileImg = (profileUrl) => {
    //     dispatch({type: "UPDATE_PROFILE_IMAGE", profileUrl: profileUrl});
    // }
    // const updateCoverImg = (coverPhoto) => {
    //     dispatch({type: "UPDATE_COVER_IMAGE", coverPhoto: coverPhoto});
    // }
    // const updateUserDetails = (data) => {
    //     console.log(data)
    //     dispatch({type: "UPDATE_USER_DETAILS", userDetails: data});
    // }

  return (
    <UserContext.Provider value={{userState: user, userDispatch: dispatch}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider