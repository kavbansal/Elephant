import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Navigation from './components/layout/Navigation';
import Add from './components/pages/Add';


import "./App.css";

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
            {/* Temporarily using Login component instead of Facebook Component */}
            
            {/* userinfo and logout should redirect if not logged in */}
          </div>
        </div>
      </Router>
    
  );
};

export default App;
