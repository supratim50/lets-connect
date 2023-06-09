import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

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
        <div className='w-100 nav-header'>
            <div className='flex px-3 py-1'>
                <div className='flex align-center'>
                    <div><Link to="/"><IconButton Icon={<IoLogoTwitter />} classes={"p-2 mr-2 superHeader text-main"} /></Link></div>
                    <TextInput placeholder={"Explore"} classes={"p-1 paragraph text-paragraph"} inputClass={"text-paragraph"} icon={<IoSearch />} />
                </div>
                <div className='flex align-center ml-auto nav-link_box'>
                    <div>
                        <Link to="/">
                            <IconButton Icon={<IoHomeSharp />} classes={"p-2 mx-2 superHeader2 text-paragraph"} />
                        </Link>
                    </div>
                    <div>
                        <IconButton Icon={<IoNotifications />} classes={"p-2 mx-2 superHeader2 text-paragraph"} />
                    </div>
                    <div className='mx-2'>
                        <ThemeButton themeHandler={themeHandler} mode={mode} />
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Header