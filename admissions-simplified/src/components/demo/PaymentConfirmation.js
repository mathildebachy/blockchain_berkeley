import React, {useContext} from 'react';
import './../Student_request.css';
import {Link} from "react-router-dom";
import done from './../../assets/done.png'
import Button from '@material-ui/core/Button';

const Payment = () => {
    return (
      <div className="student_request">
        <div className="border">
          <h1>Congratulations!</h1>
          <h3>Your request has been sent to your School Registrar.</h3>
          <h3>You will be informed when your application will be sent to the universities of your choosing.</h3>
          <img src={done} alt="all-good"></img>
          <div>
            <Link to='/student-dashboard'>
              <Button variant="contained" color="default" disableElevation>Go to dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Payment;