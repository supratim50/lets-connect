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
      <div className='flex-fill mx-3'>
        <PostCard />
      </div>
      {/* FOR FOLLOWERS SECTION */}
      <div className=''>
        <ProfileCard />
      </div>
    </div>
  )
}

export default Home