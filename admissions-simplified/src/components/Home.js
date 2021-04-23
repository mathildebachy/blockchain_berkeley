import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import digital_icon from './../assets/digital_icon.png'
import {Link} from "react-router-dom";
import { UserContext } from '../providers/UserProvider'
import { UpdateTwoTone } from '@material-ui/icons';

const Home = () => {
    const user = useContext(UserContext);

    return (
      <div className="home">
        <div>
          <h1>Transcripts and Degrees on Blockchain</h1>
          <h3>Forgery-proof and 100% digital certificates: more than 100 institutions and 15 countries trust in us to issue blockchain digital credentials</h3>
        </div>
        {!user 
        ?
        <div class="home_buttons">
          <Link to="/sign-in">
            <button class="home_button">
                <p>Get started now</p>
            </button>
          </Link>
          <Link to='/meet-the-team' className='text-link'>
            <button class="home_button">
              <p>Meet the team</p>
            </button>
          </Link>
        </div>
        : (user.userType === "student"
          ?
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
          : (user.userType === "highschool"
            ?
              <div class="home_buttons">
                <Link to={"registrar-dashboard"}>
                  <button class="home_button">
                      <p>To Dashboard</p>
                  </button>
                </Link>
                <Link to='/meet-the-team' className='text-link'>
                  <button class="home_button">
                    <p>Meet the team</p>
                  </button>
                </Link>
              </div>
            :
              <div class="home_buttons">
                <Link to={"university-dashboard"}>
                  <button class="home_button">
                      <p>To Dashboard</p>
                  </button>
                </Link>
                <Link to='/meet-the-team' className='text-link'>
                  <button class="home_button">
                    <p>Meet the team</p>
                  </button>
                </Link>
              </div>
            ) 
          )
        }
      </div>
    );
  }
  
  export default Home;