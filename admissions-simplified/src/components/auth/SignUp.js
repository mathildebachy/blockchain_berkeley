import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithGoogle, generateUserDocument } from "../../back-end/firebase";
import './SignUp.css'

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { getAllRegistrar } from '../../back-end/functions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userType, setUserType] = useState("");
  const [assignedHS, setAssignedHS] = useState("");
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);
  const [isStudent, setIsStudent] = useState(false);
  const [registrarList, setRegistrarList] = useState([]);
  const [errorPSWD, setErrorPSWD] = useState(false)

  useEffect(() => {
    getAllRegistrar().then(res => {
      setRegistrarList(res)
    })
  }, [])

  
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      if (isStudent) {
        const name = last_name+", "+first_name
        if (assignedHS !== "") generateUserDocument(user, {'displayName':name, userType, assignedHS, first_name, last_name});
        else generateUserDocument(user, {'displayName':name, userType, first_name, last_name});
      }
      else generateUserDocument(user, {displayName, userType});
      history.push("/")
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setFirstName("");
    setLastName("");
    setUserType("");
    setIsStudent(false);
    setAssignedHS("")
  };
  
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") setEmail(value);
    else if (name === "userPassword") {
      setPassword(value);
      if (value.length < 6) setErrorPSWD(true)
      else setErrorPSWD(false)
    }
    else if (name === "displayName") setDisplayName(value);
    else if (name === "assignedHS") setAssignedHS(value);
    else if (name === "first_name") setFirstName(value);
    else if (name === "last_name") setLastName(value);
    else if (name === "userType"){
      setUserType(value);
      if (value === "student") setIsStudent(true);
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
        <form className={classes.root} noValidate autoComplete="off">
          <div className="margin">
            <p><strong>I am a:</strong></p>
            <label>
              <input
              type="radio"
              name="userType"
              value="student"
              onChange={event => onChangeHandler(event)}
              /><strong>Student</strong>
            </label>
            <label>
              <input
              type="radio"
              name="userType"
              value="university"
              onChange={event => onChangeHandler(event)}
              /><strong>University</strong>
            </label>
            <label>
              <input
              type="radio"
              name="userType"
              value="highschool"
              onChange={event => onChangeHandler(event)}
              /><strong>High School</strong>
            </label>
          </div>
          {isStudent
          ?
            <>
              <TextField 
                required 
                id="first_name" 
                name="first_name"
                value={first_name}
                label="First Name" 
                defaultValue="E.g. Sean" 
                onChange={event => onChangeHandler(event)}
              />
              <TextField 
                required 
                id="last_name" 
                name="last_name"
                value={last_name}
                label="Last name" 
                defaultvalue="e.g. smith" 
                onChange={event => onChangeHandler(event)}
              />
            </>
          :
          <>
            <TextField 
              required 
              id="displayName" 
              name="displayName"
              value={displayName}
              label="Entity name" 
              defaultValue="E.g. UC Berkeley" 
              onChange={event => onChangeHandler(event)}
            />
          </>
          }
          <TextField 
            required 
            id="email"
            type="email" 
            name="userEmail"
            value={email}
            label="Email" 
            defaultValue="E.g. smith.sean@gmail.com" 
            onChange={event => onChangeHandler(event)}
          />
          {errorPSWD
          ?
          <TextField
            error
            id="standard-error-helper-text"
            label="Password"
            type="password"
            name="userPassword"
            helperText="Must be at least 6 characters long"
            onChange={event => onChangeHandler(event)}
          />
          :
          <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          name="userPassword"
          autoComplete="current-password"
          onChange={event=>onChangeHandler(event)}
          />
          }
          {isStudent 
            ? <div className="margin">
                <label htmlfor="assignedHS" classname="block">
                <strong>Current High School:</strong>
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
            <strong>Sign up</strong>
          </button>
        </form>
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