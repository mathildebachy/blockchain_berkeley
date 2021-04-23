import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../back-end/firebase"
import './PasswordReset.css'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    width: '25ch',
  }
}));

const PasswordReset = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const [fromProfilePage, setFromProfilePage] = useState(false);
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };

  useEffect(() => {
    // Checks if the user comes from profile page
    setFromProfilePage(props.location.state);
  }, [])

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };

  return (
    <div className="pswd-wrapper">
      <h1>
        Reset your Password
      </h1>
      <div className="pswd-card">
        <form action="" className={classes.form}>
          {emailHasBeenSent && (
            <div>
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div>
              {error}
            </div>
          )}
          <TextField 
            required 
            id="userEmail"
            type="email" 
            name="userEmail"
            value={email}
            label="Email" 
            defaultValue="E.g. smith.sean@gmail.com" 
            onChange={event => onChangeHandler(event)}
          />
          <button
            className="pswd-reset-btn"
            onClick={event => {
              sendResetEmail(event);
            }}
          >
            Send me a reset link
          </button>
        </form>
        {fromProfilePage
        ?
        <Link
         to ="/profile"
          className="pswd-reset-btn back-to"
        >
          &larr; back to my profile
        </Link>
        :
        <Link
         to ="/sign-in"
          className="pswd-reset-btn back-to"
        >
          &larr; back to sign in page
        </Link>
        }
      </div>
    </div>
  );
};
export default PasswordReset;