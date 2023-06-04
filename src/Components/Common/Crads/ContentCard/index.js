import React from 'react';
import "./ContentCard.style.css";

const ContentCard = ({children, styles}) => {
  return (
    <div className={`card ${styles ? styles : ''}`}>{children}</div>
  )
}

export default ContentCard