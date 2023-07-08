import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import "./Profile.style.css";

import ProfileDetails from '../../Components/PageComponents/Profile/ProfileDetails';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';
import {userLogOut} from "../../Middleware/db/userAuth"
import ProfileEdit from '../../Components/PageComponents/Profile/ProfileEdit';
import { getUserById, updateCoverPhoto, updateProfileImg, updateUserdata } from '../../Middleware/db/CURD';

import {IoCamera} from "react-icons/io5";

const Profile = () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [userOnProfile, setUserOnProfile] = useState({});
    const [editActive, setEditActive] = useState(false);
    const [otherUser, setOtherUser] = useState(false);

    const [userName, setUserName] = useState("");
    const [userAbout, setUserAbout] = useState("");
    const [userSkills, setUserSkills] = useState("");
    const [userLocation, setUserLocation] = useState("");

    const [progress, setProgress] = useState(0);
    const [profileImg, setProfileImg] = useState("");
    const [profileCover, setProfielCover] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // GETTING USER BY ID
    const { id } = useParams();

    const getuser = async () => {
        // Set author
        await getUserById(id, setUserOnProfile);
    }  

    useEffect(() => {
        if(id === "me") {
            setUserOnProfile(user);
        } else {
            getuser();
            setOtherUser(true);
        }
    }, [])

    // SETTING USER DATA ON 1ST LOAD
    useEffect(() => {
        setUserName(userOnProfile.name);
        userOnProfile.about === "" ? setUserAbout("Please tell us about you!") : setUserAbout(userOnProfile.about);
        userOnProfile.skills === "" ? setUserSkills("Please share your skills!") : setUserSkills(userOnProfile.skills);
        userOnProfile.location === "" ? setUserLocation("Please share your location!") : setUserLocation(userOnProfile.location);

        // set DP 
        setProfileImg(userOnProfile?.profileUrl);
        // set COVER
        setProfielCover(userOnProfile?.coverPhoto);
    }, [userOnProfile])

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
                    <img className='cover-photo' src={profileCover} />
                    {/* EDIT BUTTON */}
                    {
                        !otherUser && (
                            <>
                                <label htmlFor='coverPhoto' className='cover-edit flex justify-center align-center'>
                                    <p className='text-paragraph'>{<IoCamera />}</p>
                                </label>
                                <input 
                                    type="file" 
                                    id='coverPhoto' 
                                    onChange={onHandleEditCover} 
                                    style={{display: 'none'}} 
                                    accept='.jpg, .png, .jpeg'
                                />
                            </>
                        )
                    }
                </div>
                {/* DP */}
                <div className='dp-box flex align-end justify-between pr-3'>
                    <div className='dp-container flex flex-column align-center'>
                        <div className='dp-img-box'>
                            <LazyLoadImage 
                                src={profileImg}
                                className='dp'
                                alt="Image Alt"
                                effect="blur"
                            />
                            {/* <img className='dp' src={profileImg} /> */}
                            {/* EDIT BUTTON */}
                            {
                                !otherUser && (
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
                                )
                            }
                        </div>
                        <p className='heading text-heading bold my-2'>{userName}</p>
                    </div>

                    {
                        !otherUser 
                        ?   <div className='flex'>
                                <PrimaryBtn classes={"mr-2"} text={"Edit"} onClick={editDetails} />
                                <PrimaryBtn text={"Logout"} onClick={logOut} />
                            </div>
                        :   <div className='flex'>
                                <PrimaryBtn text={"Follow"} />
                            </div>
                    }
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
                userName={user.name}
                userAbout={user.about}
                userSkills={user.skills}
                userLocation={user.location}
            />
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div className={`edit-background ${isLoading && "active"}`}></div>
        <div className={`uploading-box p-3 ${isLoading && "active"}`}>
            <h3 className='paragraph text-heading'>Uploading..</h3>
            <p className='paragraph-sm text-paragraph'>{progress && Math.round(progress)}%</p>
        </div>

    </div>
  )
}

export default Profile