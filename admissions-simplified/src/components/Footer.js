import React from 'react';
import ReactDOM from 'react-dom';
import './Footer.css';
import logo_scet from './../assets/scet_logo.png'
import logo_blockchain_at_berkeley from './../assets/blockchain_at_berkeley.png'

class Footer extends React.Component {
    render() {
      return (
        <div className="footer">
          <div>
            <img src={logo_scet}></img>
          </div>

          <div class="footer_button">
            <p>Contact us</p>
          </div>

          <div>
            <img src={logo_blockchain_at_berkeley}></img>
          </div>
        </div>
      );
    }
  }
  
  export default Footer;