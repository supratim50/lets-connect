import React, { useState } from 'react';
import "./FollowerCard.style.css";

import ContentCard from '../../../Common/Crads/ContentCard';
import ShowProfileCard from '../../../Common/Crads/ShowProfileCard';

import profileImage from "../../../../Assets/Images/profile.png";

const FollowersCard = () => {

    const followers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    const [scrollTop, setScrollTop] = useState(0);

    const getScrollPosition = (e) => {
        setScrollTop(e.currentTarget.scrollTop)
    }

  return (
    <ContentCard >
        <div className={`w-100 py-2 px-3 ${scrollTop > 10 ? "shadow" : '' }`}>
            <p className='paragraph text-heading bold'>Who is Follow You</p>
        </div>

        <div className={`followers pb-2 px-3`} onScroll={getScrollPosition}>
        {
            followers.map((item) => (
                <div className='mt-2 py-2 px-1 flex justify-between follower'>
                    <ShowProfileCard
                        profileImage={profileImage}
                        name={"Elon Musk"}
                        userName={"elonmusk"} 
                    />
                    <p className='superHeader2 text-paragraph'>...</p>
                </div>
            ))
        }
        </div>
    </ContentCard>
  )
}

export default FollowersCard;