import React from 'react';
import "./NewsFeed.style.css";
import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from '../../../Common/Images/RoundedImage';
import IconTextSecondaryBtn from '../../../Common/Buttons/IconTextSecondaryBtn';

import {IoHeart, IoChatbubbleEllipses, IoShare} from "react-icons/io5"
import ShowProfileCard from '../../../Common/Crads/ShowProfileCard';

const NewsFeed = ({profileImage, name, userName, postedTime, caption, image}) => {

  return (
    <ContentCard classes={"py-2 px-3 my-2"}>
      <ShowProfileCard
        profileImage={profileImage}
        name={name}
        userName={userName}
        postedTime={postedTime}  
      />

      <div className='py-2'>
        <div>
          <p className='paragraph text-paragraph'>{caption}</p>
        </div>
        {/* <div className='flex justify-center'> */}
          {
            image ? 
            <div className='media-box flex justify-center mt-1'>
              <div className='postImageBox'>
                <img src={image} className='postImage' alt='Post' />
              </div>
            </div> : null
          }
        {/* </div> */}

        {/* LIKE and COMMENT */}
        <div className='flex align-center justify-between mt-1 py-1'>
          <div>
            <div className='flex align-center'>
              <div className='flex'>
                <RoundedImage image={profileImage} classes={"small"} styles={styles.imageStyle} />
                <RoundedImage image={profileImage} classes={"small"} styles={{...styles.imageStyle, ...styles.imageSpace}} />
                <RoundedImage image={profileImage} classes={"small"} styles={{...styles.imageStyle, ...styles.imageSpace}} />
              </div>
              <div className='ml-1'>
                <p className='paragraph-sm text-paragraph2'>120k Like</p>
              </div>
            </div>
          </div>
          <div>
            <div className=''>
              <p className='paragraph-sm text-paragraph2'>86 Comment</p>
            </div>
          </div>
        </div>

        {/* LIKE AND COMMENT BUTTON */}
        <div className='flex mt-1'>
          <IconTextSecondaryBtn icon={<IoHeart />} text={"Like"} classes={"py-2 px-3 mr-2"} />
          <IconTextSecondaryBtn icon={<IoChatbubbleEllipses />} text={"Comment"} classes={"py-2 px-3 mr-2"} />
          <IconTextSecondaryBtn icon={<IoShare />} text={"Share"} classes={"py-2 px-3"} />
        </div>

      </div>
    </ContentCard>
  )
}

const styles = {
  imageStyle : {
    border: "2px solid #ffffff",
  },
  imageSpace: {
    marginLeft: "-15px",
  }
}

export default NewsFeed