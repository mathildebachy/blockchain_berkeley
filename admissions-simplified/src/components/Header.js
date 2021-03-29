import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from './../assets/logo.png'

class Header extends React.Component {
    render() {
      return (
        <div className="header">
          
          <div class="container">
            <a href="/">
              <img src={logo} alt="logo"></img>
            </a>
          </div>

          <div class="container">
              <a href="/">How it works</a>
          </div>

          <div class="container">
              <a href="/">Stats</a>
          </div>
          
          <div class="container">
            <a href="/">Login</a>
          </div>
        </div>
      );
    }
  }
  
  export default Header;
  // Example usage: <ShoppingList name="Mark" />