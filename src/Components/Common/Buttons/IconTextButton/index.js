import React from 'react';
import "./IconTextBtn.style.css";

const IconTextButton = ({classes, iconClasses, icon, text, clickHandler}) => {
  return (
    <div 
      className={`icon_text_btn-button p-1 flex justify-center align-center ${classes ? classes : ''} ${iconClasses ? iconClasses : ''}`}
      onClick={clickHandler}
    >
        <div className={`icon_text_btn-icon header flex align-center`}>{icon}</div>
        <div className='ml-2'>
            <p className='paragraph-sm text-paragraph'>{text}</p>
        </div>
    </div>
  )
}

export default IconTextButton