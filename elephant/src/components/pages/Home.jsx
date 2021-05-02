import React, { Component } from 'react';
import axios from 'axios';
import AddItem from '../item/AddItem';

export default class Home extends Component {
  state = {
    name: '',
    email: "",
    submitted: false
  };

  resetState = () => {
    this.setState({
      name: '',
      email: "",
      submitted: false
    });
  }

  submitForm = (name, email) => {
    this.setState(
      {
        name: name,
        email: email
      }
    )
    
    axios.get(
      "/api/userinfo"
    ).then(
      (res) => {
        this.addUser(name, email);
      }
    );
  }

  addUser = () => {
    var data = new FormData();
    data.append('name', this.state.name);
    data.append('email', this.state.email);
    axios({
      method: 'post',
      url: '/api/userinfo',
      data: data,
      headers: {'Content-Type': 'multipart/form-data' }
    }).then(this.resetState());

    
  }
  render() {
    
    return (
      <React.Fragment>
        <h1>Home</h1><br/>
        <AddItem submitForm={this.submitForm}/>
        {/* <SubmissionModal showModal={this.state.showModal} handleClose={this.closeModal} simItems={this.state.similarItems}/> */}
      </React.Fragment>
    );
  }
}
