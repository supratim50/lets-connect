import React, { useState } from 'react';
import "./Register.style.css";
import TextInput from '../../Components/Common/Input/TextInput/TextInput';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';
import { Link } from 'react-router-dom';

import { signupUser } from '../../Middleware/db/userAuth';

const Register = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const createUser = async (e) => {
        if(email!== "" && pass !== "") {
            const response = await signupUser(email, pass);
            console.log(response);
        } else {
            console.log("Please Enter Email and Password!!")
        }
    }

  return (
    <div className='flex align-center justify-center w-100 register-page'>
        <div className='py-2 px-3 register-box'>
            <p className='heading text-heading my-3'>Register</p>
            <div className='my-3 w-100'>
                    <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setEmail} value={email} textType={"email"} placeholder={"Enter your email"} />
                    <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setPass} value={pass} textType={"password"} placeholder={"Enter your Password"} />
                    <PrimaryBtn text={"Create Account"} onClick={createUser} />
            </div>
            <div className='my-2 flex justify-center'>
                <Link to={"/login"} className='link text-main paragraph'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register