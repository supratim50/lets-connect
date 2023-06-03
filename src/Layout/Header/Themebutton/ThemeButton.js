import React from 'react';
import "./ThemeButton.style.css"

const ThemeButton = ({themeHandler, isDark}) => {
  return (
    <div className={`themeButton`} onClick={themeHandler}>
        <div className={`toggle-button ${isDark ? "dark" : 'light'}`}></div>
    </div>
  )
}

export default ThemeButton