import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Navigation from './components/layout/Navigation';
import Schools from './components/pages/Schools';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import SchoolProfile from './components/pages/SchoolProfile';
import Add from './components/pages/Add';
import StudentForm from './components/pages/StudentForm';
import MentorForm from './components/pages/MentorForm';


import "./App.css";
import MentorDashboard from "./components/pages/MentorDashboard";

const App = () => {
  return (
    
      <Router>
        <div className="App">
          <Navigation />
          <div className="site-container">
            {/* az-Protected route is not working, so using old way */}
            {/* <ProtectedRoute path="/add" user={false} component={Add} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/add" component={Add} />
            <Route path="/schools" component={Schools} />
            <Route path="/signin" component={Signin} />
            <Route path="/schoolProfile" component={SchoolProfile} />
            <Route path="/mentorDashboard" component={MentorDashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/studentSignupForm" component={StudentForm} />
            <Route path="/mentorSignupForm" component={MentorForm} />
            {/* Will probably replace this with /schools/id or /schools/name in future */}
            {/* Temporarily using Login component instead of Facebook Component */}
            
            {/* userinfo and logout should redirect if not logged in */}
          </div>
        </div>
      </Router>
    
  );
};

export default App;
