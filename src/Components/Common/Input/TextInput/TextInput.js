import React, { useState, useRef, useEffect } from 'react';
import "./TextInput.style.css";

import IconButton from '../../IconButton/IconButton';


const TextInput = ({icon, classes, inputClass, placeholder, resize}) => {

  // const textareaRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [value, setValue] = useState();

  useEffect(() => {
    const textarea = document.getElementById("textarea");
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setHeight(textarea.scrollHeight);
  }, [value]);

  const handleChange = (e) => {
    setValueHnadler(e);
    const textarea = document.getElementById("textarea");
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setHeight(textarea.scrollHeight);
  };

  const setValueHnadler = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className={`flex align-center input-box ${classes ? classes : ''}`}>
        {
            icon ? <IconButton Icon={icon} classes={`p-1 input-icon`} /> : ''
        }
        {
          resize 
          ? <textarea 
              value={value}
              id="textarea"
              placeholder={placeholder ? placeholder : ''} 
              // ref={textareaRef} 
              className={`text-input textarea ${inputClass ? inputClass : ''}`} 
              onChange={handleChange} 
              style={{ height: `${height}px` }} 
            /> 
          : <input 
              value={value}
              type='text' 
              placeholder={placeholder ? placeholder : ''} 
              className={`text-input ${inputClass ? inputClass : ''}`} 
              onChange={setValueHnadler}
            />
        }
    </div>
  )
}

export default TextInput