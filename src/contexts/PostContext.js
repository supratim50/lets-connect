import { createContext, useReducer } from "react";
import {postReducer, postState} from "../reducers/PostReducer";

export const PostContext = createContext();

const PostContextProvider = ({children}) =>  {
    const [state, dispatch] = useReducer(postReducer, postState);

    return(
        <PostContext.Provider value={{posts: state, dispatch}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;