import React from 'react';
import "./ProfileDetails.style.css";

const ProfileDetails = ({textarea, heading, details}) => {
  return (
    <div className='details-box m-3'>
        <h3 className='paragraph text-heading px-3 pb-1'>{heading}</h3>
        {
            textarea 
            ? <p className='details textarea p-3 paragraph text-paragraph'>{details}</p>
            : <p className='details input p-3 paragraph text-paragraph'>{details}</p>
        }
    </div>
  )
}

export default ProfileDetails