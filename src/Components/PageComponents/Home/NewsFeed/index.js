import React, { useContext, useEffect, useState } from 'react';
import "./NewsFeed.style.css";
import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from '../../../Common/Images/RoundedImage';
import IconTextSecondaryBtn from '../../../Common/Buttons/IconTextSecondaryBtn';

import {IoHeart, IoChatbubbleEllipses, IoShare} from "react-icons/io5"
import ShowProfileCard from '../../../Common/Crads/ShowProfileCard';
import { AuthContext } from '../../../../contexts/AuthContext';
import { likeUndo, likingPost } from '../../../../Middleware/db/CURD';

const NewsFeed = ({post}) => {

  console.log(post)

  const { user } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState();
  // const [isLikedByBtn, setIsLikedByBtn] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // const [likeText, setLikeText] = useState("");

  const LikeHandler = () => {
    setIsLiked(true);
    LikingPost();
    setLikeCount((count) => count + 1);
  }

  const unLikeHandler = () => {
    setIsLiked(false);
    LikeUndo();
    setLikeCount((count) => count - 1);
  }

  // LIKING 
  const LikingPost = async () => {
    const like = await likingPost(post.id, user.uid);
    console.log(like)
  }
  // UNLIKING
  const LikeUndo = async () => {
    const like = await likeUndo(post.id, user.uid);
    console.log(like)
  }

  // getting data from DB, is user already liked the post or not

  // useEffect(() => {
  //   const likeCount = post.likes?.length;
  //   let text;
  //   console.log(likeCount)
  //   // setLikeCount(likeCount);
  //   if(likeCount > 0) {
  //     const isLiked = post.likes.includes(user.uid);
  //     if(isLiked) {
  //       setIsLiked(true);
  //       if(likeCount === 1) {
  //         text = "You liked this post";
  //       } else {
  //           text = `You and ${likeCount - 1} others liked this post`;
  //       }
  //     } else {
  //       text = `${likeCount} others liked this post`;
  //     }
  //   } else {
  //     text = "Give a 1st like on this post";
  //   }

  //   setLikeText(text);
  // }, [])

  useEffect(() => {
    const likeCount = post.likes?.length;
    setLikeCount(likeCount);
    const isLiked = post.likes?.includes(user.uid);
    isLiked && setIsLiked(true)
  }, [])
  
  return (
    <ContentCard classes={"py-2 px-3 my-2"}>
      <ShowProfileCard
        profileImage={post.profileImg}
        name={post.name}
        email={post.email}
        postedTime={post.postedTime}  
      />

      <div className='py-2'>
        <div>
          {post.caption && <p className='paragraph text-paragraph'>{post.caption}</p>}
        </div>
        {/* <div className='flex justify-center'> */}
          {
            post.image &&
            <div className='media-box flex justify-center mt-1'>
              <div className='postImageBox'>
                <img src={post.image} className='postImage' alt='Post' />
              </div>
            </div>
          }
        {/* </div> */}

        {/* LIKE and COMMENT */}
        <div className='flex align-center justify-between mt-1 py-1'>
          <div>
            <div className='flex align-center'>
              <div className='flex'>
                <RoundedImage image={post.profileImg} classes={"small"} styles={styles.imageStyle} />
                <RoundedImage image={post.profileImg} classes={"small"} styles={{...styles.imageStyle, ...styles.imageSpace}} />
                <RoundedImage image={post.profileImg} classes={"small"} styles={{...styles.imageStyle, ...styles.imageSpace}} />
              </div>
              <div className='ml-1'>
                <p className='paragraph-sm text-paragraph2'>{likeCount} Likes</p>
              </div>
            </div>
          </div>
          <div>
            <div className=''>
              <p className='paragraph-sm text-paragraph2'>88 Dummy Comment</p>
            </div>
          </div>
        </div>

        {/* LIKE AND COMMENT BUTTON */}
        <div className='flex mt-1'>
          {
            isLiked
            ? <IconTextSecondaryBtn icon={<IoHeart />} text={"Like"} classes={"py-2 px-3 mr-2"} active={isLiked} onClick={unLikeHandler} />
            : <IconTextSecondaryBtn icon={<IoHeart />} text={"Like"} classes={"py-2 px-3 mr-2"} onClick={LikeHandler} />
          }
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