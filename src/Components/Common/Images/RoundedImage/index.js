import React from 'react';
import "./RoundedImage.style.css"

const RoundedImage = ({image, classes, styles}) => {
  return (
    <div className={`rounded-box ${classes ? classes : ''}`} style={styles ? styles : null}>
        <img className='rounded-photo' src={image ? image : ''} />
    </div>
  )
}

export default RoundedImage