import React, { useEffect, useState } from 'react';

import "./header.style.css";
import IconButton from '../../Components/Common/IconButton/IconButton';

import { IoHomeSharp, IoNotifications, IoLogoTwitter, IoSearch } from "react-icons/io5";
import ThemeButton from './Themebutton/ThemeButton';
import TextInput from '../../Components/Common/Input/TextInput/TextInput';

const Header = () => {

    const [isDark, setDark] = useState(false);

    const themeHandler = () => {
        setDark(!isDark);
    }

    useEffect(() => {
        const root = document.getElementById("root");
        if(isDark) {
            root.classList.add("dark-theme");
            root.classList.remove("light-theme");
        } else {
            root.classList.add("light-theme");
            root.classList.remove("dark-theme");
        }
    }, [isDark])

  return (
    <>
        <div className='flex px-3 py-2'>
            <div className='flex align-center'>
                <div><IconButton Icon={<IoLogoTwitter />} classes={"p-2 mx-2 superHeader"} /></div>
                <TextInput classes={"p-1 paragraph"} icon />
            </div>
            <div className='flex align-center ml-auto'>
                <div><IconButton Icon={<IoHomeSharp />} classes={"p-2 mx-2 superHeader2"} /></div>
                <div><IconButton Icon={<IoNotifications />} classes={"p-2 mx-2 superHeader2"} /></div>
                <div className='mx-2'>
                    <ThemeButton themeHandler={themeHandler} isDark={isDark} />
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Header