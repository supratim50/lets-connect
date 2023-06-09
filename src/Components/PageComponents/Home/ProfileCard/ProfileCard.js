import React from 'react';
import {Link} from "react-router-dom";
import "./ProfileCard.style.css";

import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from "../../../Common/Images/RoundedImage";

import CoverPhoto from "../../../../Assets/Images/cover.png";
import ProfilePhoto from "../../../../Assets/Images/profile.png";

const ProfileCard = () => {
  return (
    <ContentCard>
        <div className='w-100'>
          {/* COVER PHOTO */}
          <img className='profile-cover w-100' src={CoverPhoto} />
          {/* PROFILE PHOTO */}
          <div className='flex justify-center profile-image'>
            <RoundedImage image={ProfilePhoto} classes={"large"} />
          </div>
          {/* END PROFILE PHOTO */}
        </div>
        {/* PROFILE DETAILS */}
        <div className='py-2 px-3'>
          <div className='flex flex-column align-center px-3'>
            <h3 className='heading text-heading'>Suprtim Mondal</h3>
            <p className='paragraph text-paragraph2'>@supratim05</p>
            <p className='paragraph text-paragraph text-center'>I am a Web Developer. I am lookign for a new job</p>
          </div>
        </div>
        {/* FOLLOWERS DETAILS */}
        <div className='flex followers-box'>
          <div className='flex flex-column align-center flex-fill p-3 followers-box-left'>
            <h3 className='heading text-heading'>657</h3>
            <p className='paragraph text-paragraph2'>Following</p>
          </div>
          <div className='flex flex-column align-center flex-fill p-3 followers-box-right'>
            <h3 className='heading text-heading'>6,999</h3>
            <p className='paragraph text-paragraph2'>Followers</p>
          </div>
        </div>
        <div className='p-3 flex justify-center align-center'>
          <Link to='profile' className='link paragraph text-main'>My Profile</Link>
        </div>
      </ContentCard>
  )
}

export default ProfileCard