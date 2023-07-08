import React from 'react';
import {Link} from "react-router-dom";
import "./ProfileCard.style.css";

import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from "../../../Common/Images/RoundedImage";

const ProfileCard = ({uid, name, email, profile, cover, about, followings, followers}) => {
  return (
    <ContentCard>
        <div className='w-100'>
          {/* COVER PHOTO */}
          <div className='cover-background'>
            <img className='profile-cover w-100' src={cover} />
          </div>
          {/* PROFILE PHOTO */}
          <div className='flex justify-center profile-image'>
            <RoundedImage image={profile} classes={"large"} />
          </div>
          {/* END PROFILE PHOTO */}
        </div>
        {/* PROFILE DETAILS */}
        <div className='py-2 px-3'>
          <div className='flex flex-column align-center px-3'>
            <h3 className='heading text-heading'>{name}</h3>
            <p className='paragraph text-paragraph2'>{email}</p>
            <p className='paragraph text-paragraph text-center'>{about}</p>
          </div>
        </div>
        {/* FOLLOWERS DETAILS */}
        <div className='flex followers-box'>
          <div className='flex flex-column align-center flex-fill p-3 followers-box-left'>
            <h3 className='heading text-heading'>{followings}</h3>
            <p className='paragraph text-paragraph2'>Following</p>
          </div>
          <div className='flex flex-column align-center flex-fill p-3 followers-box-right'>
            <h3 className='heading text-heading'>{followers}</h3>
            <p className='paragraph text-paragraph2'>Followers</p>
          </div>
        </div>
        <div className='p-3 flex justify-center align-center'>
          <Link to={`profile/me`} className='link paragraph text-main'>My Profile</Link>
        </div>
      </ContentCard>
  )
}

export default ProfileCard