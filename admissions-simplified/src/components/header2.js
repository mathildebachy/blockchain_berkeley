import React from 'react';
import ReactDOM from 'react-dom';
import './header2.css';
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
      return (
        <div>
            <div className="airwolf-header">
                <span className="airwolf-header-stripe-shine one"></span>
                <span className="airwolf-header-stripe-shine two"></span>
                <span className="airwolf-header-stripe-fade one"></span>
                <span className="airwolf-header-stripe-fade two"></span>
                <span className="airwolf-header-stripe-fade three"></span>
                <span className="airwolf-header-stripe-fade four"></span>
                <span className="airwolf-header-stripe-fade five"></span>
                <span className="airwolf-header-title">UniBlock</span>
                <span className="airwolf-header-subtitle">Admissions Simplified</span>
            </div>
            <div className="airwolf-navigation">
                <ul className='nested-menu'>
                    <li><Link to="/components/univ.js">Get Started</Link></li>
                    <li><a href=''>Contact</a></li>
                    <li><a href=''>University</a></li>
                    <li><a href=''>Student</a></li>
                </ul>
            </div>

            
        </div>
      );
    }
  }
  
  export default Header;