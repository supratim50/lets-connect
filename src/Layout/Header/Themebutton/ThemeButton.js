import React from 'react';
import "./ThemeButton.style.css"

const ThemeButton = ({themeHandler, mode}) => {
  return (
    <div className={`themeButton`} onClick={themeHandler}>
        <div className={`toggle-button ${mode === 'dark' ? "dark" : "light"}`}></div>
    </div>
  )
}

export default ThemeButton