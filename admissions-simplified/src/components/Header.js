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
              <img class="App-logo" src={logo} alt="logo"></img>
            </a>
          </div>

          <div class="container header_button">
              <p>How it works</p>
          </div>

          <div class="container header_button">
              <p>Stats</p>
          </div>
          
          <div class="container header_button">
            <p>Login</p>
          </div>
        </div>
      );
    }
  }
  
  export default Header;
  // Example usage: <ShoppingList name="Mark" />