import React from 'react';
import "./Iconbutton.style.css";

const IconButton = ({Icon, classes}) => {
  return (
    <div className={`flex justify-center align-center button ${classes ? classes : ''}`}>
        {Icon}
    </div>
  )
}

export default IconButton