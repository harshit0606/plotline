import React from 'react'
import Logo from "../../assets/head.png"
import "./header.css";
function Header() {
  return (
    <div className='header_main'>
        <div className='header_logo'>
            <img src={Logo}/>
        </div>
        <div className='header_right'>
            <h3>Data</h3>
        </div>
    </div>
  )
}

export default Header