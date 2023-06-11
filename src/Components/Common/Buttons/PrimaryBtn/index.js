import React from 'react';
import "./PrimaryBtn.style.css";

const PrimaryBtn = ({text, maxWidth}) => {
  return (
    <div className={`paragraph primary-button flex justify-center py-2 mr-3 w-100 ${maxWidth ? "max-width" : ''}`}>
        <p>{text}</p>
    </div>
  )
}

export default PrimaryBtn