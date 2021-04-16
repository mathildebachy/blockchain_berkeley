import React from 'react';
import './../Home.css';
import digital_icon from './../../assets/digital_icon.png'
import {Link} from "react-router-dom";

class OurValues extends React.Component {
    render() {
      return (
        <div className="home">
          <div>
            <h1>Our Core Values</h1>
            <p className="text">At Admissions Simplified, our core values revolve around us bringing <strong>TREATS</strong> to our global partners.</p>
            <div className="list">
            <ul><strong>TREATS</strong> stands for:</ul>
                <li><strong>T</strong>ransparency,</li>
                <li><strong>A</strong>ffordability,</li>
                <li><strong>E</strong>thical (Decision-Making),</li> 
                <li><strong>R</strong>esponsibility,</li> 
                <li><strong>T</strong>enacity,</li> 
                <li>and <strong>S</strong>ustainability.</li>
            </div>
            <p className="text">At Admissions Simplified, we aim to always be transparent with our customers, providing affordable services for all. We value ethics and ethical decision-making, and our customer-centric focus ensures that we always keep our consumers in-mind. We value corporate and personal responsibility and aim to revolutionize the college admissions process. Our tenacious attitude towards sustainability drives us every day, and we hope that we can extend our TREATS to you soon!</p>
          </div>

          <div class="home_buttons">
            <Link to='/student-request'>
              <button class="home_button">
                  <p>Get Started Now</p>
              </button>
            </Link>
            <Link to='/meet-the-team' className='text-link'>
              <button class="home_button">
                <p>Meet the team</p>
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
  
  export default OurValues;