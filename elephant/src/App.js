import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Navigation from './components/layout/Navigation';
import Schools from './components/pages/Schools';
import Signin from './components/pages/Signin';
import Signout from './components/pages/Signout';
import Signup from './components/pages/Signup';
import SchoolProfile from './components/pages/SchoolProfile';
import About from './components/pages/About';
import StudentSignUp from './components/SignupForms/StudentSignUp';
import MentorSignUp from './components/SignupForms/MentorSignUp';
import SchoolMentors from './components/pages/SchoolMentors';
import QnA from './components/pages/QnA';
import Messaging from './components/pages/Messaging';

import "./App.css";
import StudentDashboard from "./components/pages/StudentDashboard";
import { AuthContextProvider } from "./components/helper/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <Navigation />
          <div className="site-container">
            {/* az-Protected route is not working, so using old way */}
            {/* <ProtectedRoute path="/add" user={false} component={Add} /> */}
            <Route exact path="/" component={About} />
            <Route exact path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/schools" component={Schools} />
            <Route path="/signin" component={Signin} />
            <Route path="/schoolProfile" component={SchoolProfile} />
            <Route path="/schoolMentors" component={SchoolMentors} />
            <Route path="/signup" component={Signup} />
            <Route path="/studentSignupForm" component={StudentSignUp} />
            <Route path="/mentorSignupForm" component={MentorSignUp} />
            <Route path="/studentDashboard" component={StudentDashboard} />
            <Route path="/QnA" component={QnA} />
            <Route path="/signout" component={Signout} />
            <Route path="/messaging" component={Messaging} />
            {/* Will probably replace schoolProfile and schoolMentors with /schools/id or /schools/name in future */}
            {/* Temporarily using Login component instead of Facebook Component */}
            
            {/* userinfo and logout should redirect if not logged in */}
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
