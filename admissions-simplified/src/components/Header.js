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
        {!user.userType 
          ? <div></div> 
          : (user.userType === "student"
            ? 
            <Link to='/student-dashboard' className='container header_button link'>
              <p>Dashboard</p>
            </Link>
            :
            <Link to='/registrar-dashboard' className='container header_button link'>
              <p>Dashboard</p>
            </Link>
            )
        }

        <Link to='/profile' className='container header_button link'>
          <p>My profile</p>
        </Link>
      </div>
      :
      <div>
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
      <div className="airwolf-header">
        <span className="airwolf-header-stripe-shine one"></span>
        <span className="airwolf-header-stripe-shine two"></span>
        <span className="airwolf-header-stripe-fade one"></span>
        <span className="airwolf-header-stripe-fade two"></span>
        <span className="airwolf-header-stripe-fade three"></span>
        <span className="airwolf-header-stripe-fade four"></span>
        <span className="airwolf-header-stripe-fade five"></span>
        <span className="airwolf-header-title">Admissions Simplified</span>
        <span className="airwolf-header-subtitle">Blockchain Technology</span>
      </div>
      <div className="airwolf-navigation">
      <ul className='nested-menu'>
          <li><Link to="/components/univ.js">Get Started</Link></li>
          <li><Link to='/how-it-works'>How it works</Link></li>
          <li><Link to='/our-values'>Our values</Link></li>
          <li><Link to='/stats'>Stats</Link></li>
          <li><Link to='/sign-in'>Sign in</Link></li>
      </ul>
      </div>
      </div>
    );
  }
  
  export default Header;