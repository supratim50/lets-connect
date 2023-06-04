import React, { useEffect, useState } from 'react';

import "./header.style.css";
import IconButton from '../../Components/Common/IconButton/IconButton';

import { IoHomeSharp, IoNotifications, IoLogoTwitter, IoSearch } from "react-icons/io5";
import ThemeButton from './Themebutton/ThemeButton';
import TextInput from '../../Components/Common/Input/TextInput/TextInput';

const Header = () => {

    const [mode, setMode] = useState("light");

    const themeHandler = () => {
        const Mode = mode === "light" ? "dark" : "light";
        localStorage.setItem("Mode", Mode);  
        setMode(Mode);
        console.log("theme handler ",Mode);
    }

    useEffect(() => {
        const root = document.getElementById("root");
        const Mode = localStorage.getItem("Mode");
        console.log("use effect",Mode);
        setMode(Mode);
        if(mode === "dark") {
            root.classList.add("dark-theme");
            root.classList.remove("light-theme");
        } else {
            root.classList.add("light-theme");
            root.classList.remove("dark-theme");
        }
    }, [mode])

  return (
    <>
        <div className='flex px-3 py-2'>
            <div className='flex align-center'>
                <div><IconButton Icon={<IoLogoTwitter />} classes={"p-2 mr-2 superHeader text-main"} /></div>
                <TextInput placeholder={"Explore"} classes={"p-1 paragraph text-paragraph"} inputClass={"text-paragraph"} icon={<IoSearch />} />
            </div>
            <div className='flex align-center ml-auto'>
                <div><IconButton Icon={<IoHomeSharp />} classes={"p-2 mx-2 superHeader2 text-paragraph"} /></div>
                <div><IconButton Icon={<IoNotifications />} classes={"p-2 mx-2 superHeader2 text-paragraph"} /></div>
                <div className='mx-2'>
                    <ThemeButton themeHandler={themeHandler} mode={mode} />
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Header