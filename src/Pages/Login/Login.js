import React, { useState } from 'react';
import "./Login.style.css";
import TextInput from '../../Components/Common/Input/TextInput/TextInput';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';

import {signinUser} from "../../Middleware/db/userAuth";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const loginUser = async (e) => {
        if(email!== "" && pass !== "") {
            try{
                await signinUser(email, pass);
                setErr(false);
                navigate("/");
            } catch(e) {
                setErr(true);
                setErrMsg("*Incorrect Email and Password!")
            }
        } else {
            setErr(true);
            setErrMsg("*Please Enter Email and Password!")
        }
    }

  return (
    <div className='flex align-center justify-center w-100 login-page'>
        <div className='py-2 px-3 login-box'>
            <p className='heading text-heading my-3'>Login</p>
            <div className='my-3 w-100'>
                    <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setEmail} value={email} textType={"email"} placeholder={"Enter your email"} />
                    <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setPass} value={pass} textType={"password"} placeholder={"Enter your Password"} />
                    {
                        err ? <p className='paragraph-sm text-danger mb-2'>{errMsg}</p> : ""
                    }
                    <PrimaryBtn text={"Signin"} onClick={loginUser} />
            </div>
            <div className='my-2 flex justify-center'>
                <Link to={"/register"} className='link text-main paragraph'>Craete an Account</Link>
            </div>
        </div>
    </div>
  )
}

export default Login