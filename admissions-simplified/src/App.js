import './App.css';
import React, { useState } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserProvider from './providers/UserProvider'
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Student_request from "./components/Student_request";
import registrar from "./components/registrar";
import Signup from './components/auth/SignUp'
import SignIn from './components/auth/SignIn';
import ProfilePage from './components/user/ProfilePage'
import PasswordReset from './components/user/PasswordReset';

function App() {
  const [token, setToken] = useState();
  console.log(token)
  //   if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return(
  <UserProvider>
    <BrowserRouter>
      <div>
        <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/student-request" component={Student_request} />
              <Route exact path="/registrar" component={registrar} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={Signup} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/password-reset" component={PasswordReset}/>
            </Switch>
          <Footer />
      </div>
    </BrowserRouter>
  </UserProvider>
  );
}

export default App;
