import React, { useContext, useEffect, useState } from 'react';
import {LazyLoadImage, LazyLoadComponent} from "react-lazy-load-image-component";
import placeholder from "../../../../Assets/Images/blank.jpg";
import "./NewsFeed.style.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

import ContentCard from '../../../Common/Crads/ContentCard';
import RoundedImage from '../../../Common/Images/RoundedImage';
import IconTextSecondaryBtn from '../../../Common/Buttons/IconTextSecondaryBtn';

import Img from "../../../../Assets/Images/profile.png";

import {IoHeart, IoChatbubbleEllipses, IoShare} from "react-icons/io5"
import ShowProfileCard from '../../../Common/Crads/ShowProfileCard';
import { AuthContext } from '../../../../contexts/AuthContext';
import { getUserById, likeUndo, likingPost } from '../../../../Middleware/db/CURD';
import { useNavigate } from 'react-router-dom';

const NewsFeed = ({post}) => {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [isLiked, setIsLiked] = useState();
  const [author, setAuthor] = useState();
  // const [isLikedByBtn, setIsLikedByBtn] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // const [likeText, setLikeText] = useState("");

  const clickHandlerOnProfile = () => {
    navigate(`profile/${author.uid === user.uid ? "me" : author.uid}`);
  }

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
  }
  // UNLIKING
  const LikeUndo = async () => {
    const like = await likeUndo(post.id, user.uid);
  }

  const getuser = async () => {
      // Set author
      await getUserById(post.userId, setAuthor);
  }

  useEffect(() => {
      console.log(post)
      getuser();
      //set like count
      const likeCount = post.likes?.length;
      setLikeCount(likeCount);
      const isLiked = post.likes?.includes(user.uid);
      isLiked && setIsLiked(true)

  }, [])
  
  return (
    <LazyLoadComponent key={post.id}>
      <ContentCard classes={"py-2 px-3 my-2"}>
        {
          author && (
              <ShowProfileCard
                onClick={clickHandlerOnProfile}
                profileImage={author.profileUrl && author.profileUrl}
                name={author.name && author.name}
                email={author.email && author.name}
                postedTime={post.postedTime}  
              />
          )
        }

        <div className='py-2'>
          <div>
            {post.caption && <p className='paragraph text-paragraph'>{post.caption}</p>}
          </div>
          {/* <div className='flex justify-center'> */}
            {
              post.image &&
              <div className='media-box flex justify-center mt-1'>
                <div className='postImageBox'>
                  {/* <img src={post.image} className='postImage' alt='Post' loading='lazy' /> */}
                  <LazyLoadImage 
                    src={post.image}
                    className='postImage'
                    alt="Image Alt"
                    effect="blur"
                    placeholderSrc={placeholder}
                  />
                </div>
              </div>
            }
          {/* </div> */}

          {/* LIKE and COMMENT */}
          <div className='flex align-center justify-between mt-1 py-1'>
            <div>
              <div className='flex align-center'>
                <div className='flex'>
                  <RoundedImage image={Img} classes={"small"} styles={styles.imageStyle} />
                  <RoundedImage image={Img} classes={"small"} styles={{...styles.imageStyle, ...styles.imageSpace}} />
                  <RoundedImage image={Img} classes={"small"} styles={{...styles.imageStyle, ...styles.imageSpace}} />
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
    </LazyLoadComponent>
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