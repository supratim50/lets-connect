import React from 'react';
import "./PostCard.style.css";

import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from '../../../Common/Images/RoundedImage';

import ProfileImage from "../../../../Assets/Images/profile.png";
import TextInput from '../../../Common/Input/TextInput/TextInput';
import IconTextButton from '../../../Common/Buttons/IconTextButton';

import {IoImage, IoPlayCircle, IoListCircle, IoCalendar} from "react-icons/io5";

const PostCard = () => {
  return (
    <ContentCard styles={"py-2 px-3"}>
        <div className='flex align-center px-1'>
            <div >
                <RoundedImage image={ProfileImage} style={"medium"} />
            </div>
            <TextInput placeholder={"What's Happening?"} classes={"ml-2 p-2"} inputClass={"paragraph text-paragraph"} />
        </div>
        <div className='py-2 px-3 flex justify-end'>
          <IconTextButton classes={"px-4 py-2 mr-3"} iconClasses={"green"} icon={<IoImage />} text={"Photo"} />
          <IconTextButton classes={"px-4 py-2 mr-3"} iconClasses={"blue"} icon={<IoPlayCircle />} text={"Video"} />
          <IconTextButton classes={"px-4 py-2 mr-3"} iconClasses={"red"} icon={<IoListCircle />} text={"Story"} />
          <IconTextButton classes={"px-4 py-2"} iconClasses={"yellow"} icon={<IoCalendar />} text={"Schedule"} />
        </div>
    </ContentCard>
  )
}

export default PostCard;