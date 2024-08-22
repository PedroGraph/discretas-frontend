import React from "react";
import '../css/loader.css'

export const MainLoader = ({styles}) =>{
    return (
        <div className={`${styles } wrapper`}>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>
    )
}

export const SecondLoader = ({styles}) => {
    return (    
      <span class={`${styles } loader`}></span>
    )
}

export const SuccessLoader = ({styles}) => {
    return (
      <>
        <div className={`${styles } check-container`}>
          <div className="check-background">
            <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="check-shadow" />
          </div>
      </>
    )
}