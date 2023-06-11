import React from 'react';
import "./Profile.style.css";

import CoverPhoto from "../../Assets/Images/cover.png";
import ProfilePhoto from "../../Assets/Images/profile.png";
import ProfileDetails from '../../Components/PageComponents/Profile/ProfileDetails';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className='flex justify-center align-center profile-page'>
        <div className='profile-box'>
            <div className='cover'>
                <img className='cover-photo' src={CoverPhoto} />
            </div>
            <div className='dp-box flex align-end justify-between pr-3'>
                <div className='dp-container flex flex-column align-center'>
                    <img className='dp' src={ProfilePhoto} />
                    <p className='heading text-heading bold my-2'>Elon Musk</p>
                </div>

                <PrimaryBtn text={"Logout"} maxWidth />
            </div>

            <ProfileDetails 
                textarea
                heading={"About"}
                details={"Quality Engineering Associates at Cognizant. Worked as a Front-end developer at FavFly(startup). Lead a small team at FavFly."}
            />
            <ProfileDetails 
                heading={"Skills"}
                details={"React.js, React Native, Web Development"}
            />
            <ProfileDetails 
                heading={"Location"}
                details={"Kolkata"}
            />
        </div>
    </div>
  )
}

export default Profile