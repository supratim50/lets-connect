import React from 'react';
import "./ShowProfileCard.style.css";

import RoundedImage from '../../Images/RoundedImage';


const ShowProfileCard = ({profileImage, name, userName, postedTime}) => {
  return (
    <div className='flex align-center'>
        <div >
          <RoundedImage image={profileImage ? profileImage : ""} classes={"medium"} />
        </div>
        <div className='ml-2'>
          <p className='paragraph text-heading bold'>{name ? name : ''}</p>
          <p className='paragraph-sm text-paragraph2'>@{userName ? userName : ''} {postedTime ?  <span>&#x2022; {postedTime}</span> : null} </p> {/* &#x2022; this is for DOT */}
        </div>
      </div>
  )
}

export default ShowProfileCard;