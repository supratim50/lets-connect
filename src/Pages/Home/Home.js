import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import "./Home.style.css";

import ProfileCard from "../../Components/PageComponents/Home/ProfileCard/ProfileCard"
import PostCard from '../../Components/PageComponents/Home/PostCard';
import NewsFeed from '../../Components/PageComponents/Home/NewsFeed';
import FollowersCard from '../../Components/PageComponents/Home/FollowersCard';
import { PostContext } from '../../contexts/PostContext';
import { getPosts } from '../../Middleware/db/CURD';
// import {UserContext} from '../../contexts/UserContextProvider';

const Home = () => {

  const { user } = useContext(AuthContext);
  // const { userState } = useContext(UserContext);
  const {posts, dispatch} = useContext(PostContext);

  // FOR POST
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
              about={user.about}
              followings={user.following?.length}
              followers={user.followers?.length}
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