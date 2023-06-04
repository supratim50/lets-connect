import React from 'react';
import "./PostCard.style.css";

import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from '../../../Common/Images/RoundedImage';

import ProfileImage from "../../../../Assets/Images/profile.png";
import TextInput from '../../../Common/Input/TextInput/TextInput';

const PostCard = () => {
  return (
    <ContentCard styles={"py-2 px-3"}>
        <div className='flex align-center px-1'>
            <div >
                <RoundedImage image={ProfileImage} style={"medium"} />
            </div>
            <TextInput placeholder={"What's Happening?"} classes={"ml-2 p-2"} inputClass={"paragraph text-paragraph"} />
            
        </div>
    </ContentCard>
  )
}

export default PostCard;