import React, { useContext } from 'react';
import './Header.css';
import logo from './../assets/logo.png'
import {Link} from "react-router-dom";
import { UserContext } from '../providers/UserProvider'

const Header = () => {
  const user = useContext(UserContext);
  return (
    user ?
    <div>
    <div className="airwolf-header">
      <span className="airwolf-header-stripe-shine one"></span>
      <span className="airwolf-header-stripe-shine two"></span>
      <span className="airwolf-header-stripe-fade one"></span>
      <span className="airwolf-header-stripe-fade two"></span>
      <span className="airwolf-header-stripe-fade three"></span>
      <span className="airwolf-header-stripe-fade four"></span>
      <span className="airwolf-header-stripe-fade five"></span>
      <Link to='/'><span className="airwolf-header-title">Admissions Simplified</span></Link>
      <span className="airwolf-header-subtitle">Blockchain Technology</span>
    </div>
    <div className="airwolf-navigation">
    <ul className='nested-menu'>
      <li><Link to='/how-it-works'>How it works</Link></li>
      <li><Link to='/our-values'>Our values</Link></li>
      <li><Link to='/stats'>Stats</Link></li>

      {!user.userType 
          ? <div></div> 
          : (user.userType === "student"
            ? 
            <li><Link to='/student-dashboard'>Dashboard</Link></li>
            :(user.userType === "university"
              ? <li><Link to='/university-dashboard'>Dashboard</Link></li>
              : <li><Link to='/registrar-dashboard'>Dashboard</Link></li>
            )
            )
        }
      <li><Link to='/profile'>My Profile</Link></li>
    </ul>
    </div>
    </div>
      :
      <div>
      <div className="airwolf-header">
        <span className="airwolf-header-stripe-shine one"></span>
        <span className="airwolf-header-stripe-shine two"></span>
        <span className="airwolf-header-stripe-fade one"></span>
        <span className="airwolf-header-stripe-fade two"></span>
        <span className="airwolf-header-stripe-fade three"></span>
        <span className="airwolf-header-stripe-fade four"></span>
        <span className="airwolf-header-stripe-fade five"></span>
        <Link to='/'><span className="airwolf-header-title">Admissions Simplified</span></Link>
        <span className="airwolf-header-subtitle">Blockchain Technology</span>
      </div>
      <div className="airwolf-navigation">
      <ul className='nested-menu'>
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