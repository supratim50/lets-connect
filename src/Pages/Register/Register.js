import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./Register.style.css";

import TextInput from '../../Components/Common/Input/TextInput/TextInput';
import PrimaryBtn from '../../Components/Common/Buttons/PrimaryBtn';

import {IoArrowForwardOutline, IoCloseOutline} from "react-icons/io5";

import { signupUser } from '../../Middleware/db/userAuth';

const Register = () => {

    // USER data
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [dp, setDp] = useState();

    // Login Handler
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isDpEmpty, setIsDpEmpty] = useState(false);

    // translate value
    const [translate, setTranslate] = useState("0");
    const [animatedBox, setAnimatedBox] = useState();

    const navigate = useNavigate();

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

    // Animation NEXT function
    const handleNext = () => {
        console.log("Handle Next clicked!");

        const animatedBox = document.getElementById("animated-box");

        const boxWidth = animatedBox.offsetWidth;

        if(translate == 0) {
            if(name != "" && userName != "") {
                setIsNameEmpty(false);
                let newTranslateValue = Number(translate) - boxWidth;
                setTranslate(`${newTranslateValue}`);
            } else {
                setIsNameEmpty(true);
            }
        } else if(translate < -200 && translate > -310) {
            if(email != "" && pass != "") {
                setIsEmailEmpty(false);
                let newTranslateValue = Number(translate) - boxWidth;
                setTranslate(`${newTranslateValue}`);
            } else {
                setIsEmailEmpty(true);
            }
        }
    }

    // Animation PREVIOUS function
    const handlePrev = () => {
        console.log("Handle Prev clicked!");

        const boxWidth = animatedBox.offsetWidth;

        let newTranslateValue = Number(translate) + boxWidth;
        setTranslate(newTranslateValue);
    }

    // SET ANIMATED DIV
    useEffect(() => {
        setAnimatedBox(document.getElementById("animated-box"));
    }, [])

    // SET STYLE TRANSLATE
    useEffect(() => {
        console.log(`translateX(${translate}px)`);
        if(animatedBox) {
            animatedBox.style.transform = `translateX(${translate}px)`;
        }
    }, [translate])

  return (
    <div className='flex align-center justify-center w-100 register-page'>
        <div className='py-2 px-3 register-box'>
            <p className='heading text-heading my-3'>Register</p>
            {/* animated section */}
            <div className='overflow-hide'>
                {/* ANIMATED BOX */}
                <div className='flex' id="animated-box">
                    {/* NAME BOX */}
                    <div className='w-100 switchable-box'>
                        <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setName} value={name} textType={"text"} placeholder={"Enter your name"} />
                        <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setUserName} value={userName} textType={"text"} placeholder={"Enter your @username"} />
                        {
                            isNameEmpty ? <p className='paragraph-sm text-danger mb-2'>* Please enter Name and Username.</p> : ""
                        }
                        {/* <PrimaryBtn text={"Create Account"} onClick={createUser} /> */}
                        <div className='flex justify-end'>
                            <PrimaryBtn text={"Next"} onClick={handleNext} maxWidth />
                        </div>
                    </div>
                    {/* EMAIL AND PASSWORD BOX */}
                    <div className='w-100 switchable-box'>
                        <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setEmail} value={email} textType={"email"} placeholder={"Enter your email"} />
                        <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={setPass} value={pass} textType={"password"} placeholder={"Enter your Password"} />
                        {
                            isEmailEmpty ? <p className='paragraph-sm text-danger mb-2'>* Please enter Email and Password.</p> : ""
                        }
                        {/* <PrimaryBtn text={"Create Account"} onClick={createUser} /> */}
                        <div className='flex justify-between'>
                            <PrimaryBtn text={"Prev"} onClick={handlePrev} maxWidth />
                            <PrimaryBtn text={"Next"} onClick={handleNext} maxWidth />
                        </div>
                    </div>
                    {/* COVER BOX */}
                    <div className='w-100 switchable-box'>
                        <input type='file'  />
                        {
                            isDpEmpty ? <p className='paragraph-sm text-danger mb-2'>* Please enter Email and Password.</p> : ""
                        }
                        {/* <PrimaryBtn text={"Create Account"} onClick={createUser} /> */}
                        <div className='flex justify-between'>
                            <PrimaryBtn text={"Prev"} onClick={handlePrev} maxWidth />
                            <PrimaryBtn text={"Get Started"} classes={"ml-2"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-2 flex justify-center'>
                <Link to={"/login"} className='link text-main paragraph'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register