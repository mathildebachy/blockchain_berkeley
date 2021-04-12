import React, { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import { auth, generateUserDocument } from "../../back-end/firebase";
import { UserContext } from '../../providers/UserProvider'
import { useHistory } from 'react-router-dom'

import { getAllRegistrar } from '../../back-end/functions'



const UpdateUserInfo = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newUserType, setNewUserType] = useState("");
  const [newAssignedHS, setNewAssignedHS] = useState("");
  const [error, setError] = useState(null);
  const [isStudent, setIsStudent] = useState(false);
  const [registrarList, setRegistrarList] = useState([]);

  useEffect(() => {
    getAllRegistrar().then(res => {
      setRegistrarList(res)
    })
  }, []);

  //Redirects to homepage if no user
  if (!user) {
    history.push("/");
    return(<div></div>);
  }

  const {photoURL, displayName, email, assignedHS, userType} = user;
  console.log(displayName, email, assignedHS, userType)


  const updateUserInfo = async (event, email, password) => {
    event.preventDefault();

    setNewEmail("");
    setPassword("");
    setNewDisplayName("");
    setNewUserType("");
    setIsStudent(false);
    setNewAssignedHS("")
  };
  
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setNewEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setNewDisplayName(value);
    }
    else if (name === "newAssignedHS") {
      setNewAssignedHS(value)
    }
    else if (name === "newUserType"){
      setNewUserType(value);
      if (value === "student"){
        setIsStudent(true);
      }
      else {
        setIsStudent(false);
        setNewAssignedHS("")
      }
    }
  };
  
  return (
    <div className="signup-wrapper">
      <h1>Update your user information</h1>
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
            name="newDisplayName"
            value={newDisplayName}
            placeholder="E.g: Faruq"
            id="newDisplayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            name="newUserEmail"
            value={newEmail}
            placeholder="E.g: faruq123@gmail.com"
            id="newUserEmail"
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
              name="newUserType"
              value="student"
              onChange={event => onChangeHandler(event)}
              />Student
            </label>
            <label>
              <input
              type="radio"
              name="newUserType"
              value="university"
              onChange={event => onChangeHandler(event)}
              />University
            </label>
            <label>
              <input
              type="radio"
              name="newUserType"
              value="highschool"
              onChange={event => onChangeHandler(event)}
              />High School
            </label>
          </div>
          {isStudent 
            ? <div className="margin">
                <label htmlfor="newAssignedHS" classname="block">
                  Current High School:
                </label>
                <select value={newAssignedHS} name="newAssignedHS" onChange={event=>onChangeHandler(event)}>
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
              updateUserInfo(event, newEmail, password);
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserInfo;