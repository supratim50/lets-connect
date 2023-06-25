import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import "./Profile.style.css";

import CoverPhoto from "../../Assets/Images/cover.png";
import ProfileDetails from '../../Components/PageComponents/Profile/ProfileDetails';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';

import {userLogOut} from "../../Middleware/db/userAuth"
import ProfileEdit from '../../Components/PageComponents/Profile/ProfileEdit';
import { updateUserdata } from '../../Middleware/db/CURD';

const Profile = () => {

    const {user, currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [editActive, setEditActive] = useState(false);
    const [userAbout, setUserAbout] = useState("");
    const [userSkills, setUserSkills] = useState("");
    const [userLocation, setUserLocation] = useState("");

    useEffect(() => {
        user.about === "" ? setUserAbout("Please tell us about you!") : setUserAbout(user.about);
        user.skills === "" ? setUserSkills("Please share your skills!") : setUserSkills(user.skills);
        user.location === "" ? setUserLocation("Please share your location!") : setUserLocation(user.location);
    }, [])


    const logOut = () => {
        userLogOut();
        navigate("/login")
    }

    const editDetails = () => {
        setEditActive(!editActive);
    }
    
    const updateData = (name, about, skills, location) => {
        const data = {
            name,
            about,
            skills,
            location
        }

        try {
            updateUserdata(user.id, data);
        } catch(e) {
            console.log(e.message);
        }
    }


  return (
    <div className='profile-page'>
        <div className='page profile flex justify-center '>
            <div className='profile-box'>
                <div className='cover'>
                    <img className='cover-photo' src={user.coverPhoto} />
                </div>
                <div className='dp-box flex align-end justify-between pr-3'>
                    <div className='dp-container flex flex-column align-center'>
                        <img className='dp' src={user.profileUrl} />
                        <p className='heading text-heading bold my-2'>{user.name}</p>
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
                        details={userAbout}
                    />
                    <ProfileDetails 
                        heading={"Skills"}
                        details={userSkills}
                    />
                    <ProfileDetails 
                        heading={"Location"}
                        details={userLocation}
                    />
                </div>
            </div>
        </div>


        {/* PROFILE EDIT SECTION */}
        <div className={`edit-background ${editActive && "active"}`} onClick={editDetails}></div>
        <div className={`edit-box ${editActive && "active"}`}>
            <ProfileEdit 
                updateData={updateData} 
                DBname={user.name}
                DBabout={user.about}
                DBskills={user.skills}
                DBlocation={user.location}
            />
        </div>

    </div>
  )
}

export default Profile