import React from 'react';
import "./RoundedImage.style.css"

const RoundedImage = ({image, style}) => {
  return (
    <div className={`rounded-box ${style ? style : ''}`}>
        <img className='rounded-photo' src={image ? image : ''} />
    </div>
  )
}

export default RoundedImage