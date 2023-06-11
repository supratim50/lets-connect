import React from 'react';
import "./PrimaryBtn.style.css";

const PrimaryBtn = ({text, maxWidth, onClick}) => {
  return (
    <button className={`paragraph primary-button flex justify-center py-2 mr-3 w-100 ${maxWidth ? "max-width" : ''}`} onClick={onClick}>
        <p>{text}</p>
    </button>
  )
}

export default PrimaryBtn