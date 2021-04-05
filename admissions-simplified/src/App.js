import './App.css';
import React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FirestoreProvider } from "@react-firebase/firestore";
import { firebaseConfig } from './back-end/firebase.config'
import firebase from "firebase/app";

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
import StudentDashboard from './components/dashboard/StudentDashboard'
import EnhancedTable from './components/dashboard/StudentDashboard'

function App() {
  return(
    <FirestoreProvider {...firebaseConfig} firebase={firebase}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
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
                  <Route exact path="/student-dashboard" component={StudentDashboard}/>

                </Switch>
              <Footer />
          </div>
        </BrowserRouter>
      </UserProvider>
    </FirestoreProvider>
  );
}

export default App;
