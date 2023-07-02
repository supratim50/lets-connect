import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import "./Assets/Styles/GlobalStyles.css";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
import UserContextProvider from "./contexts/UserContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <UserContextProvider>
        <AuthContextProvider>
            <PostContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PostContextProvider>
        </AuthContextProvider>
    </UserContextProvider>
)