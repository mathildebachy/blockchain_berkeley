import React, { useContext } from 'react';
import './Header.css';
import logo from './../assets/logo.png'
import {Link} from "react-router-dom";
import { UserContext } from '../providers/UserProvider'

const Header = () => {
  const user = useContext(UserContext);
  return (
    user ?
    <div className="header">

      <Link to='/' className='container link'>
        <img className="App-logo" src={logo} alt="logo"></img>
      </Link>

      <div className="container header_button">
          <p>How it works</p>
      </div>

      <div className="container header_button">
          <p>Stats</p>
      </div>
      
      <Link to='/profile' className='container header_button link'>
        <p>My profile</p>
      </Link>
    </div>
    :
    <div className="header">
      
      <div className="container">
        <a href="/">
          <img className="App-logo" src={logo} alt="logo"></img>
        </a>
      </div>

      <div className="container header_button">
          <p>How it works</p>
      </div>

      <div className="container header_button">
          <p>Stats</p>
      </div>
      
      <Link to='/sign-in' className='container header_button link'>
        <p>Sign In</p>
      </Link>
    </div>
    );
  }
  
  export default Header;