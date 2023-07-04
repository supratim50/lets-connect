import React, { useEffect, useState } from 'react';
import "./ShowProfileCard.style.css";

import RoundedImage from '../../Images/RoundedImage';


const ShowProfileCard = ({profileImage, name, email, postedTime, classes, onClick}) => {

  return (
    <div className={`pointer flex align-center ${classes ? classes : ''}`} key={email} onClick={onClick && onClick}>
        <div >
          <RoundedImage image={profileImage ? profileImage : ""} classes={"medium"} />
        </div>
        <div className='ml-2'>
          <p className='paragraph text-heading bold'>{name ? name : ''}</p>
          <p className='paragraph-sm text-paragraph2'>{email ? email : ''} {postedTime && <span>&#x2022; {`Just Now`}</span>} </p> {/* &#x2022; this is for DOT */}
        </div>
      </div>
  )
}

export default ShowProfileCard;