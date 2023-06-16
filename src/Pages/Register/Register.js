import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./Register.style.css";
// COMPONENTS
import { signupUser } from '../../Middleware/db/userAuth';
import RegisterBox from '../../Components/PageComponents/Register/RegisterBox';
// MIDDLEWARE
import { getImage, uploadFile, setUserData } from '../../Middleware/db/CURD';

const Register = () => {
    
    const navigate = useNavigate();

    // USER data
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [dpPath, setDpPath] = useState("https://i.pinimg.com/originals/f5/c2/33/f5c233abe166b186b989293ad18ba07a.jpg");
    const [coverPhoto, setCoverPhoto] = useState("https://marketplace.canva.com/EAFSUH0EweU/1/0/1600w/canva-black-elegant-personal-linkedin-banner-eEN5zzEf5VA.jpg");
    const [isImgLoading, setImgLoading] = useState(false);

    // UPLOADING PROFILE IMAGE
    const fileHandler = async (e) => {
        setImgLoading(true);
        const dp_url = await uploadFile(e.target.files[0], email);
        // getting the path
        setDpPath(dp_url);
        setImgLoading(false);
    }

    const value = {
        name, 
        userName, 
        email, 
        pass, 
        setName, 
        setUserName, 
        setEmail, 
        setPass, 
        setFile: fileHandler,
        dpPath,
        isImgLoading
    }
    
    // Register function
    const createUser = async (e) => {
        if(email!== "" && pass !== "" && name !== "" && userName !== "") {
            // setIsEmpty(false);
            const user = await signupUser(email, pass, name, dpPath);
            const userResponse = await setUserData(user.displayName, userName, user.email, user.photoURL, user.uid, coverPhoto);
            console.log("signUp", user);
            console.log("userDetails", userResponse);
            navigate("/");
        } else {
            console.log("Please Enter Email and Password!!");
            // setIsEmpty(true);
        }
    }

  return (
    <div className='flex align-center justify-center w-100 register-page'>
        <div className='py-2 px-3 register-box'>
            <p className='heading text-heading my-3'>Register</p>
            {/* animated section */}
            <div className='overflow-hide'>
                <RegisterBox value={value} createUser={createUser} />
            </div>
            <div className='my-2 flex justify-center'>
                <Link to={"/login"} className='link text-main paragraph'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register