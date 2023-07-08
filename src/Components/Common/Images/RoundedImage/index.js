import React from 'react';
import "./RoundedImage.style.css";

import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const RoundedImage = ({image, classes, styles}) => {
  return (
    <div className={`rounded-box ${classes ? classes : ''}`} style={styles ? styles : null}>
      <LazyLoadImage 
          src={image ? image : ''}
          className='rounded-photo'
          alt="Image Alt"
          effect="blur"
      />
        {/* <img className='rounded-photo' src={image ? image : ''} /> */}
    </div>
  )
}

export default RoundedImage