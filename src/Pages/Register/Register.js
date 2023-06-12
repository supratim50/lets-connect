import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./Register.style.css";
// COMPONENTS
import { signupUser } from '../../Middleware/db/userAuth';
import RegisterBox from '../../Components/PageComponents/Register/RegisterBox';
//IMAGES
import Profile from "../../Assets/Images/profile.png";
// MIDDLEWARE
import { getImage, uploadFile } from '../../Middleware/db/CURD';

const Register = () => {
    
    const navigate = useNavigate();

    // USER data
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [dp, setDp] = useState();
    const [dpPath, setDpPath] = useState(Profile);
    const [isImgLoading, setImgLoading] = useState(false);

    const fileHandler = async (e) => {
        setImgLoading(true);
        setDp(e.target.files[0]);
        const dp_url = await uploadFile(e.target.files[0]);
        // getting the path
        const imageUrl = dp_url.ref.fullPath;
        // get the download URL
        setDpPath(await getImage(imageUrl));
        setImgLoading(false);
    }

    const value = {
        name, 
        userName, 
        email, 
        pass, 
        dp, 
        setName, 
        setUserName, 
        setEmail, 
        setPass, 
        setDp: fileHandler,
        dpPath,
        isImgLoading
    }
    
    // Register function
    const createUser = async (e) => {
        if(email!== "" && pass !== "") {
            // setIsEmpty(false);
            const response = await signupUser(email, pass);
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
                <RegisterBox value={value} />
            </div>
            <div className='my-2 flex justify-center'>
                <Link to={"/login"} className='link text-main paragraph'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register