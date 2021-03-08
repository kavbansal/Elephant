import React, { Component } from 'react';
import AboutDescription from '../item/AboutDescription';

export default class Add extends Component {
  

  render() {
    
    return (
      <React.Fragment>
        <h1>About</h1><br/>
        <AboutDescription/>
      </React.Fragment>
    );
  }
}
