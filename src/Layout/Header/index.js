import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

import "./header.style.css";
import { IoHomeSharp, IoNotifications, IoRocket, IoSearch } from "react-icons/io5";

import IconButton from '../../Components/Common/IconButton/IconButton';
import ThemeButton from './Themebutton/ThemeButton';
import TextInput from '../../Components/Common/Input/TextInput/TextInput';

import { getUser } from '../../Middleware/db/CURD';
import ShowProfileCard from '../../Components/Common/Crads/ShowProfileCard';

const Header = ({children, register}) => {

    const [search, setSearch] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);

    const [mode, setMode] = useState("light");

    // SEARCH
    const searchHandler = async () => {
        const users = await getUser(search);
        setSearchOpen(true);
        setSearchUsers(users);
    }
    // PRESSING ENTER
    const handleKey = (e) => {
        (e.code === "Enter" || e.code === "NumpadEnter") && searchHandler();
    }

    // THEME HANDLER
    const themeHandler = () => {
        const Mode = mode === "light" ? "dark" : "light";
        localStorage.setItem("Mode", Mode);  
        setMode(Mode);
    }

    useEffect(() => {
        const root = document.getElementById("root");
        const Mode = localStorage.getItem("Mode");
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
                    <div><Link to="/"><IconButton Icon={<IoRocket />} classes={"p-2 mr-2 superHeader text-main"} /></Link></div>
                    <div>
                        {
                            register
                            ? null
                            // If user is on register page then this section should not shown
                            : <TextInput 
                                placeholder={"Explore"} 
                                classes={"p-1 paragraph text-paragraph"} 
                                inputClass={"text-paragraph"} 
                                icon={<IoSearch />} 
                                onChange={setSearch}
                                value={search}
                                handleKey={handleKey}
                            />
                        }
                    </div>
                </div>
                <div className='flex align-center ml-auto nav-link_box'>
                    {
                        register
                        ? null
                        // If user is on register page then this section should not shown
                        : <>
                            <div>
                                <Link to="/">
                                    <IconButton Icon={<IoHomeSharp />} classes={"p-2 mx-2 superHeader2 text-paragraph"} />
                                </Link>
                            </div>
                            <div>
                                <IconButton Icon={<IoNotifications />} classes={"p-2 mx-2 superHeader2 text-paragraph"} />
                            </div>
                        </>
                    }
                    <div className='mx-2'>
                        <ThemeButton themeHandler={themeHandler} mode={mode} />
                    </div>
                </div>
            </div>
        </div>

        {
            searchUsers.length > 0 && searchOpen
            ?   <div className='searchComponent flex p-1'>
                    <div className='flex-fill'>
                    {
                        searchUsers.map((user) => (
                        <div className='user p-2'>
                            <ShowProfileCard 
                                name={user.name} 
                                email={user.email}
                                profileImage={user.profileUrl}
                                classes={"pointer"}
                            />
                        </div>
                        ))
                        
                    }
                    </div>
                    
                    <div className='heading text-paragraph flex justify-center align-center pointer cross' onClick={() => setSearchOpen(false)}>X</div>
                </div> : ''
        }


        {children}
        
    </>
  )
}

export default Header