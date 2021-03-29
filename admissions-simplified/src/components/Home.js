import React from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import digital_icon from './../assets/digital_icon.png'

class Home extends React.Component {
    render() {
      return (
        <div className="home">
          <div>
            <h1>Transcripts and Degrees on Blockchain</h1>
            <p class="text">Forgery-proof and 100% digital certificates: more than 100 institutions and 15 countries trust in us to issue blockchain digital credentials</p>
          </div>

          <div class="home_buttons">
            <div>
              <p>I'm a student</p>
            </div>
            <div>
              <p>I'm a registrar</p>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Home;
  // Example usage: <ShoppingList name="Mark" />