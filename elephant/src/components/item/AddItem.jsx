import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

export class AddItem extends Component {

  state = {
    name: '',
    email: "",
    submitted: false
  }

  clearForm = () => {
    this.setState({
      name: '',
      email: ""
    });
  }

  onClick = (e) => {
    this.setState({found: true});
  }

  onSubmit = (e) => {

    e.preventDefault();

    this.props.submitForm(this.state.name, this.state.email);
    // this.showSubmitToast();
    this.setState({ submitted: true});
    this.clearForm();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  

  toggleSubmitToast = () => {
    this.setState({ submitted: false });
  }

  render() {
    return (
      // flexbox
      <div style={{border: '3px solid', borderRadius: '10px', margin: 'auto', width: '70%', minWidth: '600px', padding: '20px', backgroundColor: 'white'}}>
        <Toast show={this.state.submitted} onClose={this.toggleSubmitToast} delay={3000} autohide style={{ position: 'fixed',top: 80, right: 10}}>
          <Toast.Header style={{backgroundColor:'#4CAF50'}}>
            <strong className="mr-auto">Elephant Notification</strong>
          </Toast.Header>
          <Toast.Body>Your submission was successful!</Toast.Body>
        </Toast>
        <Form onSubmit={this.onSubmit} style={{ textAlign : 'left'}}>

          <Form.Group controlId='formItemName'>
            <Form.Label>Sign up for updates about our website.</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='name'
              value={this.state.name}
              onChange={this.onChange}
              required
            />
            <Form.Control
              type='text'
              name='email'
              placeholder='email'
              value={this.state.email}
              onChange={this.onChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

AddItem.propTypes = {
  submitForm: PropTypes.func.isRequired
}

export default AddItem;
