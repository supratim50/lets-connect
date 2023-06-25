import React, { useEffect, useState } from 'react';
import "./ProfileEdit.style.css";

import TextInput from "../../../Common/Input/TextInput/TextInput";
import PrimaryBtn from '../../../Common/Buttons/PrimaryBtn';

const ProfileEdit = ({updateData, DBabout, DBskills, DBlocation, DBname}) => {

    const [about, setAbout] = useState("");
    const [name, setName] = useState("");
    const [skills, setSkills] = useState("");
    const [location, setLocation] = useState("");
    const [isNameEmpty, setIsNameEmpty] = useState(false);

    useEffect(() => {
        setAbout(DBabout);
        setName(DBname);
        setSkills(DBskills);
        setLocation(DBlocation);
    }, [])

    const submitHandler = () => {
      if(name === ""){
        setIsNameEmpty(true);
        return;
      } else {
        setIsNameEmpty(false);
        updateData(name, about, skills, location);
      }
    }

  return (
    <div className='profile-edit p-3'>
        <div className='pb-3'>
            <h3 className='paragraph text-heading px-3 pb-1'>Name</h3>
            <TextInput 
              placeholder={"Please enter your Name"} 
              inputClass={"paragraph text-paragraph p-2"} 
              onChange={setName} 
              value={name} 
            />
            {
                isNameEmpty && <p className='paragraph-sm text-danger mb-2'>* Please enter Name.</p>
            }
        </div>
        <div className='pb-3'>
            <h3 className='paragraph text-heading px-3 pb-1'>About</h3>
            <TextInput 
              placeholder={"Your About Section is Empty. Let's fill it!"} 
              inputClass={"paragraph text-paragraph p-2"} 
              resize 
              onChange={setAbout} 
              value={about} 
            />
        </div>
        <div className='pb-3'>
            <h3 className='paragraph text-heading px-3 pb-1'>Skills</h3>
            <TextInput 
              placeholder={"Please enter your skills!"} 
              inputClass={"paragraph text-paragraph p-2"} 
              onChange={setSkills} 
              value={skills} 
            />
        </div>
        <div className='pb-3'>
            <h3 className='paragraph text-heading px-3 pb-1'>Location</h3>
            <TextInput 
              placeholder={"Where are you living ?"} 
              inputClass={"paragraph text-paragraph p-2"} 
              onChange={setLocation} 
              value={location} 
            />
        </div>
        <PrimaryBtn 
            text={"Update"} 
            classes={"ml-auto"}
            maxWidth
            onClick={submitHandler} 
        />
    </div>
  )
}

export default ProfileEdit