import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import "./Profile.style.css";

import ProfileDetails from '../../Components/PageComponents/Profile/ProfileDetails';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';
import {userLogOut} from "../../Middleware/db/userAuth"
import ProfileEdit from '../../Components/PageComponents/Profile/ProfileEdit';
import { updateCoverPhoto, updateProfileImg, updateUserdata } from '../../Middleware/db/CURD';

import {IoCamera} from "react-icons/io5";

const Profile = () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [editActive, setEditActive] = useState(false);
    const [userName, setUserName] = useState("");
    const [userAbout, setUserAbout] = useState("");
    const [userSkills, setUserSkills] = useState("");
    const [userLocation, setUserLocation] = useState("");

    const [progress, setProgress] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [profielCover, setProfielCover] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // SETTING USER DATA ON 1ST LOAD
    useEffect(() => {
       setUserName(user.name);
        user.about === "" ? setUserAbout("Please tell us about you!") : setUserAbout(user.about);
        user.skills === "" ? setUserSkills("Please share your skills!") : setUserSkills(user.skills);
        user.location === "" ? setUserLocation("Please share your location!") : setUserLocation(user.location);

        // set DP 
        setProfileImg(user?.profileUrl);
        // set COVER
        setProfielCover(user?.coverPhoto);
    }, [user])

    // LOGOUT
    const logOut = () => {
        userLogOut();
        navigate("/login")
    }

    // OENING EDIT VIEW
    const editDetails = () => {
        setEditActive(!editActive);
    }
    
    // DATA UPDATEING
    const updateData = (name, about, skills, location) => {
        const data = {
            name,
            about,
            skills,
            location
        }

        try {
            updateUserdata(user.id, data);
            // setting the state
            setUserAbout(about);
            setUserLocation(location);
            setUserSkills(skills);
            setUserName(name);

            // const updated_details = userDispatch({type: "UPDATE_USER_DETAILS", userDetails: data});
            // console.log("updated details",updated_details)

        } catch(e) {
            console.log(e.message);
        }

        setEditActive(false);
    }

    // UPDATE PROFILE IMAGE
    const onHandleEditDP = async (e) => {
        try {
            await updateProfileImg(e.target.files[0], user.id, user.email, setProgress, setProfileImg, setIsLoading);
            
        } catch(e) {
            console.log(e)
        }
    }

    // UPDATE PROFILE IMAGE
    const onHandleEditCover = async (e) => {
        try {
            await updateCoverPhoto(e.target.files[0], user.id, user.email, setProgress, setProfielCover, setIsLoading);
            
        } catch(e) {
            console.log(e)
        }
    }

  return (
    <div className='profile-page'>
        <div className='page profile flex justify-center'>
            <div className='profile-box'>
                {/* COVER */}
                <div className='cover'>
                    <img className='cover-photo' src={profielCover} />
                    {/* EDIT BUTTON */}
                    <label htmlFor='coverPhoto' className='cover-edit flex justify-center align-center'>
                        <p className='text-paragraph'>{<IoCamera />}</p>
                    </label>
                    <input type="file" id='coverPhoto' onChange={onHandleEditCover} style={{display: 'none'}} />
                </div>
                {/* DP */}
                <div className='dp-box flex align-end justify-between pr-3'>
                    <div className='dp-container flex flex-column align-center'>
                        <div className='dp-img-box'>
                            <img className='dp' src={profileImg} />
                            {/* EDIT BUTTON */}
                            <div 
                                className='dp-edit flex justify-center align-center' 
                                onClick={() => document.getElementById("edit-file").click()}
                            >
                                <input 
                                    type="file" 
                                    id="edit-file" 
                                    onChange={onHandleEditDP} 
                                    accept='.jpg, .png, .jpeg'
                                />
                                <p className='text-paragraph'>{<IoCamera />}</p>
                            </div>
                        </div>
                        <p className='heading text-heading bold my-2'>{userName}</p>
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