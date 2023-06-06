import React from 'react';
import "./NewsFeed.style.css";
import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from '../../../Common/Images/RoundedImage';

const NewsFeed = ({profileImage, name, userName, postedTime, caption, image}) => {
  return (
    <ContentCard styles={"py-2 px-3 my-2"}>
      <div className='flex align-center'>
        <div >
          <RoundedImage image={profileImage} style={"medium"} />
        </div>
        <div className='ml-2'>
          <p className='paragraph text-heading bold'>{name}</p>
          <p className='paragraph-sm text-paragraph2'>@{userName} &#x2022; {postedTime} </p> {/* &#x2022; this is for DOT */}
        </div>
      </div>

      <div className='py-2'>
        <div>
          <p className='paragraph text-paragraph mb-1'>{caption}</p>
        </div>
        {/* <div className='flex justify-center'> */}
          <div className='media-box flex justify-center'>
            <div className='postImageBox'>
              <img src={image} className='postImage' alt='Post' />
            </div>
          </div>
        {/* </div> */}
      </div>
    </ContentCard>
  )
}

export default NewsFeed