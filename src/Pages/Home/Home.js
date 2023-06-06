import React from 'react';
import "./Home.style.css";

import ProfileCard from "../../Components/PageComponents/Home/ProfileCard/ProfileCard"
import PostCard from '../../Components/PageComponents/Home/PostCard';
import NewsFeed from '../../Components/PageComponents/Home/NewsFeed';

import testPhoto01 from "../../Assets/Images/photoTest01.jpg";
import testPhoto02 from "../../Assets/Images/photoTest02.jpg";
import ProfileImage from "../../Assets/Images/profile.png";

const Home = () => {
  return (
    <div className='mx-2 px-3 flex justify-between'>
      {/* FOR PROFILE CARD */}
      <div className='position-fixed'>
        <ProfileCard />
      </div>
      {/* FOR POST SECTION */}
      <div className='flex-fill mx-3'>
        <PostCard />
        <NewsFeed 
          image={testPhoto01} 
          caption={"But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;."} 
          name={"Elon Musk"}
          userName={"elonmusk01"}
          profileImage={ProfileImage}
          postedTime={"10 hours ago"}
        />
        <NewsFeed image={testPhoto02} 
          caption={"But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes &#x2022;."} 
          name={"Elon Musk"}
          userName={"elonmusk01"}
          profileImage={ProfileImage}
          postedTime={"10 hours ago"}
        />
      </div>
      {/* FOR FOLLOWERS SECTION */}
      <div className='position-fixed'>
        <ProfileCard />
      </div>
    </div>
  )
}

export default Home