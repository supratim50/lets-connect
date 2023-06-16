import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import "./Home.style.css";

import ProfileCard from "../../Components/PageComponents/Home/ProfileCard/ProfileCard"
import PostCard from '../../Components/PageComponents/Home/PostCard';
import NewsFeed from '../../Components/PageComponents/Home/NewsFeed';
import FollowersCard from '../../Components/PageComponents/Home/FollowersCard';
import { getUserById } from '../../Middleware/db/CURD';

import testPhoto01 from "../../Assets/Images/photoTest01.jpg";
import testPhoto02 from "../../Assets/Images/photoTest02.jpg";
import testPhoto03 from "../../Assets/Images/photoTest03.jpg";
import testPhoto04 from "../../Assets/Images/photoTest04.jpg";
import testPhoto05 from "../../Assets/Images/photoTest05.jpg";
import testPhoto06 from "../../Assets/Images/photoTest06.jpg";
import ProfileImage from "../../Assets/Images/profile.png";

const posts = [
  {
    caption: "But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;.",
    name: "Elon Musk",
    userName: "elonmusk01",
    profileImage: ProfileImage,
    postedTime: "10 hours ago",
    image: testPhoto01
  },
  {
    caption: "But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;.",
    name: "Elon Musk",
    userName: "elonmusk01",
    profileImage: ProfileImage,
    postedTime: "10 hours ago",
    image: testPhoto02
  },
  {
    caption: "But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;.",
    name: "Elon Musk",
    userName: "elonmusk01",
    profileImage: ProfileImage,
    postedTime: "10 hours ago",
    image: testPhoto03
  },
  {
    caption: "But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;.",
    name: "Elon Musk",
    userName: "elonmusk01",
    profileImage: ProfileImage,
    postedTime: "10 hours ago",
    image: testPhoto04
  },
  {
    caption: "But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;.",
    name: "Elon Musk",
    userName: "elonmusk01",
    profileImage: ProfileImage,
    postedTime: "10 hours ago",
    image: testPhoto05
  },
  {
    caption: "But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;.",
    name: "Elon Musk",
    userName: "elonmusk01",
    profileImage: ProfileImage,
    postedTime: "10 hours ago",
    image: testPhoto06
  },
]

const Home = () => {

  const {currentUser, user} = useContext(AuthContext);

  console.log(user)


  return (
    <>
         <div className='page'>
          {/* FOR PROFILE CARD */}
          <div className='position-fixed side-details profile-details'>
            <ProfileCard 
              name={user.name} 
              email={user.email}
              profile={user.profileUrl}
              cover={user.coverPhoto}
              about={"Web Developer"}
              followings={"699"}
              followers={"6,999"}
            />
          </div>
  
          <div className='mx-2 px-3 flex newsfeed-section'>      
          {/* FOR POST SECTION */}
          <div className='flex-fill newsfeed'>
            <PostCard currentUser={user} />
            {
              posts.map((post) => (
                <NewsFeed  
                  caption={post.caption} 
                  name={post.name}
                  userName={post.userName}
                  profileImage={post.profileImage}
                  postedTime={post.postedTime}
                  image={post.image}
                />
              ))
            }
            
          </div>
        </div>
        
          {/* FOR FOLLOWERS SECTION */}
          <div className='position-fixed side-details followers-details'>
            <FollowersCard />
          </div>
          </div>
    </>
  )
}

export default Home