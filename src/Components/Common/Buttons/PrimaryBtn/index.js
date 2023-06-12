import React from 'react';
import "./PrimaryBtn.style.css";

const PrimaryBtn = ({text, maxWidth, onClick, classes}) => {
  return (
    <button className={`paragraph primary-button flex justify-center py-2 w-100 ${maxWidth ? "max-width" : ''} ${classes ? classes : ''}`} onClick={onClick}>
        <p>{text}</p>
    </button>
  )
}

export default PrimaryBtn