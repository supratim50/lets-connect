import React from 'react';
import "./TextInput.style.css";

import IconButton from '../../IconButton/IconButton';


const TextInput = ({icon, classes, inputClass, placeholder, }) => {
  return (
    <div className={`flex align-center input-box ${classes ? classes : ''}`}>
        {
            icon ? <IconButton Icon={icon} classes={`p-1 input-icon`} /> : ''
        }
        <input type='text' placeholder={placeholder ? placeholder : ''} className={`text-input ${inputClass ? inputClass : ''}`} />
    </div>
  )
}

export default TextInput