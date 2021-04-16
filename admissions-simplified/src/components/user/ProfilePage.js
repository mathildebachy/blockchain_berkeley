import React, { useContext } from "react";
import { auth } from "../../back-end/firebase";
import { UserContext } from '../../providers/UserProvider'
import './ProfilePage.css'
import { useHistory } from "react-router-dom"


const ProfilePage = () => {
    // useContext hook to get the current value of UserContext
  const user = useContext(UserContext);
  const history = useHistory();
  
  //Redirects to homepage if no user
  if (!user) {
    history.push("/");
    return(<div></div>);
  }
  
  const {photoURL, displayName, email} = user;
  const signOut = () => {
    auth.signOut();
    // Redirection to homepage after logout
    history.push("/")
  }
  return (
    <div className = "global-wrapper">
      <div className="profile-card">
        <div
          style={{
            background:
             `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
            alignSelf: "center"
          }}
        ></div>
        <div>
          <h2>{displayName}</h2>
          <p>Email: {email}</p>
        </div>
      </div>
      <button className="signout-button" onClick={() => {signOut();}}>Sign out</button>
    </div>
  ) 
};
export default ProfilePage;