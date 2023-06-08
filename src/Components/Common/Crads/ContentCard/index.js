import React from 'react';
import "./ContentCard.style.css";

const ContentCard = ({children, classes, styles}) => {
  return (
    <div className={`card ${classes ? classes : ''}`} style={styles ? styles : null}>{children}</div>
  )
}

export default ContentCard