import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from './../assets/logo.png'

class Header extends React.Component {
    render() {
      return (
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
          
          <div className="container header_button">
            <p>Login</p>
          </div>
        </div>
      );
    }
  }
  
  export default Header;
  // Example usage: <ShoppingList name="Mark" />