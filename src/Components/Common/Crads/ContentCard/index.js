import React from 'react';
import "./ContentCard.style.css";

const ContentCard = ({children}) => {
  return (
    <div className='card'>{children}</div>
  )
}

export default ContentCard