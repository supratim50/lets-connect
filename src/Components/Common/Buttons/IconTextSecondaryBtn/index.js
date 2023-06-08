import React from 'react';
import "./IconTextSecondary.style.css";

const IconTextSecondary = ({text, icon, classes, onClick}) => {
  return (
    <button className={`p-1 flex justify-center align-center IconTextSecondary-button ${classes ? classes : ''}`} onClick={onClick}>
        <div className='flex align-center'>
            <div className='superHeader2 text-paragraph flex align-center btn-icon'>
                {icon}
            </div>
            <div className='paragraph-sm text-paragraph ml-1 btn-text'>
                {text}
            </div>
        </div>
    </button>
  )
}

export default IconTextSecondary