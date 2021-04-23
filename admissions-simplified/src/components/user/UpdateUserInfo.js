import React, { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import { updateUserDocument } from "../../back-end/firebase";
import { UserContext } from '../../providers/UserProvider'
import { useHistory } from 'react-router-dom'

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

const UpdateUserInfo = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newAssignedHS, setNewAssignedHS] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [registrarList, setRegistrarList] = useState([]);

  const {photoURL, displayName, email, assignedHS, userType, first_name, last_name} = user;

  useEffect(() => {
    setIsStudent(user.userType === "student")
    setNewFirstName(user.first_name)
    setNewLastName(user.last_name)
    setNewEmail(user.email);
    setNewAssignedHS(user.assignedHS)
    setNewDisplayName(user.displayName)
    getAllRegistrar().then(res => {
      setRegistrarList(res)
    })
  }, []);

  //Redirects to homepage if no user
  if (!user) {
    history.push("/");
    return(<div></div>);
  }


  const updateUserInfo = async (event) => {
    event.preventDefault();
    let new_information = {}
    if (userType === "student") {
      let newAH = assignedHS;
      let newFN = first_name;
      let newLN = last_name;
      let newEM = email;
      if (newAssignedHS !== assignedHS && newAssignedHS !== "") newAH = newAssignedHS
      if (newFirstName !== first_name && newFirstName !== "") newFN = newFirstName;
      if (newLastName !== last_name && newLastName !== "") newLN = newLastName;
      if (newEmail !== email && newEmail !== "") newEM = newEmail;
      const newDN = newLN+", "+newFN;
      new_information = {
        displayName: newDN,
        email: newEM,
        assignedHS: newAH,
        first_name: newFN,
        last_name: newLN,
        userType: userType,
        photoURL: photoURL,
      }
    } 
    else {
      let newDN = displayName
      let newEM = email;
      if (newDisplayName !== displayName && newDisplayName !== "") newDN = newDisplayName;
      if (newEmail !== email && newEmail !== "") newEM = newEmail;
      new_information = {
        displayName: newDN,
        email: newEM,
        userType: userType,
        photoURL: photoURL,
      }
    }
    updateUserDocument(user.uid, new_information).then(value => {
      history.push("/")
    })
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    console.log(name, value)
    if (name === "userEmail") setNewEmail(value);
    else if (name === "displayName") setNewDisplayName(value);
    else if (name === "assignedHS") setNewAssignedHS(value);
    else if (name === "first_name") setNewFirstName(value);
    else if (name === "last_name") setNewLastName(value);
  };
  
  return (
    <div className="signup-wrapper">
      <h1>Update User Information</h1>
      <div className="signup-card">
        <form className={classes.root} noValidate autoComplete="off">
          {isStudent
          ?
            <>
              <TextField 
                required 
                id="first_name" 
                name="first_name"
                value={newFirstName}
                label="First Name" 
                onChange={event => onChangeHandler(event)}
              />
              <TextField 
                required 
                id="last_name" 
                name="last_name"
                value={newLastName}
                label="Last name" 
                onChange={event => onChangeHandler(event)}
              />
            </>
          :
          <>
            <TextField 
              required 
              id="displayName" 
              name="displayName"
              value={newDisplayName}
              label="Entity name" 
              onChange={event => onChangeHandler(event)}
            />
          </>
          }
          <TextField 
            required 
            id="email"
            type="email" 
            name="userEmail"
            value={newEmail}
            label="Email" 
            onChange={event => onChangeHandler(event)}
          />
          {isStudent 
            ? <div className="margin">
                <label htmlFor="assignedHS" className="block">
                  Current High School:
                </label>
                <select value={newAssignedHS} name="assignedHS" onChange={event=>onChangeHandler(event)}>
                  {registrarList.map(registrar => (
                    <option value={registrar.displayName} id={registrar.displayName}>{registrar.displayName}</option>
                  ))}
                </select>
              </div>
              : <div></div>
          }
          <button
            className="signup-button margin"
            onClick={updateUserInfo}
          >
            Update information
          </button>
          <Link to="/profile">
            <button
            className="signup-button">
              Back to profile page
            </button>
          </Link>
        </form>
      </div>
    </div>
   
  );
};

export default UpdateUserInfo;