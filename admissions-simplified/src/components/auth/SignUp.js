import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { auth, signInWithGoogle, generateUserDocument } from "../../back-end/firebase";
import './SignUp.css'

import { getAllRegistrar } from '../../back-end/functions'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { setRef } from "@material-ui/core";



const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userType, setUserType] = useState("");
  const [assignedHS, setAssignedHS] = useState("");
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);
  const [isStudent, setIsStudent] = useState(false);
  const [registrarList, setRegistrarList] = useState([]);

  
  useEffect(() => {
    getAllRegistrar().then(res => {
      setRegistrarList(res)
    })
  }, [])
  
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      if (assignedHS !== "") generateUserDocument(user, {displayName, userType, assignedHS});
      else generateUserDocument(user, {displayName, userType});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setUserType("");
    setIsStudent(false);
    setAssignedHS("")
  };
  
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
    else if (name === "assignedHS") {
      setAssignedHS(value)
    }
    else if (name === "userType"){
      setUserType(value);
      if (value === "student"){
        setIsStudent(true);
      }
      else {
        setIsStudent(false);
        setAssignedHS("")
      }
    }
  };
  
  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      <div className="signup-card">
        {error !== null && (
          <div>
            {error}
          </div>
        )}
        <form>
          <label htmlfor="displayname" classname="block">
            Display Name:
          </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <div className="margin">
            <p>I'm a:</p>
            <label>
              <input
              type="radio"
              name="userType"
              value="student"
              onChange={event => onChangeHandler(event)}
              />Student
            </label>
            <label>
              <input
              type="radio"
              name="userType"
              value="university"
              onChange={event => onChangeHandler(event)}
              />University
            </label>
            <label>
              <input
              type="radio"
              name="userType"
              value="highschool"
              onChange={event => onChangeHandler(event)}
              />High School
            </label>
          </div>
          {isStudent 
            ? <div className="margin">
                <label htmlfor="assignedHS" classname="block">
                  Current High School:
                </label>
                <select value={assignedHS} name="assignedHS" onChange={event=>onChangeHandler(event)}>
                  {registrarList.map(registrar => (
                    <option value={registrar.displayName}>{registrar.displayName}</option>
                  ))}
                </select>
              </div>
              : <div></div>
          }
          <button
            className="signup-button margin"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button
        className="signup-button"
          onClick = {() => signInWithGoogle()}
        >
          Sign In with Google
        </button>
        <p>
          Already have an account?{" "}
          <Link to="/sign-in">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;