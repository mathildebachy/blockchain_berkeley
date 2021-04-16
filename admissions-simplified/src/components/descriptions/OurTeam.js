import React from 'react';
import './../Home.css';
import digital_icon from './../../assets/digital_icon.png'
import our_team from './../../assets/our-team.png'
import {Link} from "react-router-dom";

class OurTeam extends React.Component {
    render() {
      return (
        <div className="home">
          <div>
            <img src={our_team} alt="our-team"></img>
          </div>
        </div>
      );
    }
  }
  
  export default OurTeam;