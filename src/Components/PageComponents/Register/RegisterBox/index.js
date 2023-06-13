import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";


import TextInput from '../../../Common/Input/TextInput/TextInput';
import PrimaryBtn from '../../../Common/Buttons/PrimaryBtn';

import {IoCamera, IoHourglass} from "react-icons/io5";

const RegisterBox = ({value, createUser}) => {

    // Login Handler
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isDpEmpty, setIsDpEmpty] = useState(false);

    // translate value
    const [translate, setTranslate] = useState("0");
    const [animatedBox, setAnimatedBox] = useState();

    // Animation NEXT function
    const handleNext = () => {

        const animatedBox = document.getElementById("animated-box");

        const boxWidth = animatedBox.offsetWidth;

        if(translate == 0) {
            if(value.name != "" && value.userName != "") {
                setIsNameEmpty(false);
                let newTranslateValue = Number(translate) - boxWidth;
                setTranslate(`${newTranslateValue}`);
            } else {
                setIsNameEmpty(true);
            }
        } else if(translate < -200 && translate > -310) {
            var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(value.email.match(mailFormat)) {
                if(value.email != "" && value.pass != "") {
                    setIsEmailEmpty(false);
                    let newTranslateValue = Number(translate) - boxWidth;
                    setTranslate(`${newTranslateValue}`);
                } else {
                    setIsEmailEmpty(true);
                }
            }else {
                setIsEmailEmpty(true);
            }
            
        }
    }

    // Animation PREVIOUS function
    const handlePrev = () => {
        const boxWidth = animatedBox.offsetWidth;

        let newTranslateValue = Number(translate) + boxWidth;
        setTranslate(newTranslateValue);
    }

    const fileHandler = () => {
        document.getElementById("dp-input").click();
    }


    // SET ANIMATED DIV
    useEffect(() => {
        setAnimatedBox(document.getElementById("animated-box"));
    }, [])

    // SET STYLE TRANSLATE
    useEffect(() => {
        if(animatedBox) {
            animatedBox.style.transform = `translateX(${translate}px)`;
        }
    }, [translate])

  return (
    <>
        {/* ANIMATED BOX */}
        <div className='flex' id="animated-box">
                    {/* NAME BOX */}
                    <div className='w-100 switchable-box'>
                        <div className='form'>
                            <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={value.setName} value={value.name} textType={"text"} placeholder={"Enter your name"} />
                            <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={value.setUserName} value={value.userName} textType={"text"} placeholder={"Enter your @username"} />
                            {
                                isNameEmpty ? <p className='paragraph-sm text-danger mb-2'>* Please enter Name and Username.</p> : ""
                            }
                        </div>
                        <div className='flex justify-end'>
                            <PrimaryBtn text={"Next"} onClick={handleNext} maxWidth />
                        </div>
                    </div>
                    {/* EMAIL AND PASSWORD BOX */}
                    <div className='w-100 switchable-box'>
                        <div className='form'>
                            <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={value.setEmail} value={value.email} textType={"email"} placeholder={"Enter your email"} />
                            <TextInput classes={"my-2"} inputClass={"py-2 px-3 w-100 paragraph text-paragraph"} onChange={value.setPass} value={value.pass} textType={"password"} placeholder={"Enter your Password"} />
                            {
                                isEmailEmpty ? <p className='paragraph-sm text-danger mb-2'>* Please enter Valid Email and Password.</p> : ""
                            }
                        </div>
                        <div className='flex justify-between'>
                            <PrimaryBtn text={"Prev"} onClick={handlePrev} maxWidth />
                            <PrimaryBtn text={"Next"} onClick={handleNext} maxWidth />
                        </div>
                    </div>
                    {/* DP BOX */}
                    <div className='w-100 switchable-box'>
                        <div className='form flex justify-center align-center'>
                            <input type='file' id="dp-input" onChange={value.setFile} />
                            <div className='flex jsutify-center align-center register-profile_box'>
                                <img src={value.dpPath} className='profile-img' />
                                {
                                    value.isImgLoading
                                    ? (<div className='loader-box flex justify-center align-center'>
                                        <p className='spin-loader text-paragraph superHeader2'><IoHourglass /></p>
                                    </div>)
                                    : <div className='flex justify-center align-center superHeader2 text-heading camera-box' onClick={fileHandler}><IoCamera /></div>
                                }
                                
                            </div>
                        </div>
                        {
                            isDpEmpty ? <p className='paragraph-sm text-danger mb-2'>* Please enter Email and Password.</p> : ""
                        }
                        <div className='flex justify-between'>
                            <PrimaryBtn text={"Prev"} onClick={handlePrev} maxWidth />
                            <PrimaryBtn text={"Get Started"} classes={"ml-2"} onClick={createUser} />
                        </div>
                    </div>
                </div>
    </>
  )
}

export default RegisterBox