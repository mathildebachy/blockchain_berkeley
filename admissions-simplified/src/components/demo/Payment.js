import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './../Student_request.css';
import {Link} from "react-router-dom";
import payment from './../../assets/payment.png'
import ReceiptIcon from '@material-ui/icons/Receipt';
import Button from '@material-ui/core/Button';

const Payment = () => {
    return (
      <div className="student_request">
        <div className="border">
          <h1>Payment</h1>
          <img src={payment} alt="payment module"></img>
          <div className="no_text_decoration">
            <Link to='/payment-confirmation'>
              <Button variant="contained" color="default" disableElevation><ReceiptIcon color="default"></ReceiptIcon>Pay</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Payment;