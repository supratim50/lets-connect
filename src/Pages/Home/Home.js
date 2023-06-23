import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import "./Home.style.css";

import ProfileCard from "../../Components/PageComponents/Home/ProfileCard/ProfileCard"
import PostCard from '../../Components/PageComponents/Home/PostCard';
import NewsFeed from '../../Components/PageComponents/Home/NewsFeed';
import FollowersCard from '../../Components/PageComponents/Home/FollowersCard';
import { PostContext } from '../../contexts/PostContext';
import { getPosts, getUserById } from '../../Middleware/db/CURD';

const Home = () => {

  const { user } = useContext(AuthContext);
  const {posts, dispatch} = useContext(PostContext);

  useEffect(() => {
    const unsub = async () => {

      const getData = await getPosts();
      console.log("getData",getData)
      dispatch({type: "SET", payload: getData});
    }

    return () => unsub()
  }, [])

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
              // console.log(posts)
              posts.length > 0 
              && (
                posts.map((post) => {
                  return (
                    <NewsFeed  
                      post={post}
                    />
                  )
                })
              )

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