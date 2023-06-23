import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import "./Profile.style.css";

import CoverPhoto from "../../Assets/Images/cover.png";
import ProfileDetails from '../../Components/PageComponents/Profile/ProfileDetails';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';

import {userLogOut} from "../../Middleware/db/userAuth"

const Profile = () => {

  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

    const logOut = () => {
        userLogOut();
        navigate("/login")
    }

    const editDetails = () => {}

  return (
    <div className='flex justify-center align-start profile-page'>
        <div className='page'>
            <div className='profile-box'>
                <div className='cover'>
                    <img className='cover-photo' src={CoverPhoto} />
                </div>
                <div className='dp-box flex align-end justify-between pr-3'>
                    <div className='dp-container flex flex-column align-center'>
                        <img className='dp' src={currentUser.photoURL} />
                        <p className='heading text-heading bold my-2'>{currentUser.displayName}</p>
                    </div>

                    <div className='flex'>
                        <PrimaryBtn classes={"mr-2"} text={"Edit"} onClick={editDetails} />
                        <PrimaryBtn text={"Logout"} onClick={logOut} />
                    </div>
                </div>

                <div className='pb-3'>
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
        </div>
    </div>
  )
}

export default Profile