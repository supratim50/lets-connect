import React from 'react';
import "./TextInput.style.css";

import { IoSearch } from "react-icons/io5";
import IconButton from '../../IconButton/IconButton';


const TextInput = ({icon, classes}) => {
  return (
    <div className={`flex align-center p-1 input-box ${classes ? classes : ''}`}>
        {
            icon ? <IconButton Icon={<IoSearch />} classes={`p-1 input-icon`} /> : ''
        }
        <input type='text' className='text-input' />
    </div>
  )
}

export default TextInput