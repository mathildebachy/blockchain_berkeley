import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from './../assets/logo.png'

class Header extends React.Component {
    render() {
      return (
        <div className="header">
          <div>
            <a href="/">
              <img src={logo} alt="logo"></img>
              <span>Admissions Simplified</span>
            </a>
          </div>
          
          <div class="header-buttons">
            <div>
              <a href="/">How it works</a>
            </div>
            <div>
              <a href="/">Stats</a>
            </div>
          </div>

          <div>
            <a href="/">Login</a>
          </div>
        </div>
      );
    }
  }
  
  export default Header;
  // Example usage: <ShoppingList name="Mark" />