import React from 'react';

import ProfileCard from "../../Components/PageComponents/Home/ProfileCard/ProfileCard"

import "./Home.style.css";
import PostCard from '../../Components/PageComponents/Home/PostCard';

const Home = () => {
  return (
    <div className='mx-2 px-3 flex justify-between'>
      {/* FOR PROFILE CARD */}
      <ProfileCard />
      {/* FOR POST SECTION */}
      <div className='flex-fill ml-1'>
        <PostCard />
      </div>
      {/* FOR FOLLOWERS SECTION */}
      <div className='ml-1'>
        <ProfileCard />
      </div>
    </div>
  )
}

export default Home