import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../../back-end/firebase";
import { UserContext } from '../../providers/UserProvider'
import './SignIn.css'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [redirect, setredirect] = useState(null);
    const user = useContext(UserContext)
    const history = useHistory();

    useEffect(() => {
      if (user) {
        if (user.userType === "student") setredirect('/how-it-works');
        else setredirect('/');
      }
    }, [user]);
    
    if (redirect) {
      history.push(redirect);
    }

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      });
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <div className="signin-wrapper">
      <h1 className="title">Sign In</h1>
      <div className="sign-in-card">
        {error !== null && <div>{error}</div>}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value = {email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="signin-button margin" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </form>
        <div className="additional-info">
          <p>
            Don't have an account?{" "}
            <Link to="sign-up">
              Sign up here
            </Link>{" "}
            <br />{" "}
            <Link to = "password-reset">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;