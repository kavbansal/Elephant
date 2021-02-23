import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

function getCookieValue(a) {
	let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : null;
}
export class AboutDescription extends Component {

  state = {
    name: '',
    desc: '',
    found: false,
    location: [39.3299, -76.6205],
    radius: 25,
    tags: 0,
    img: [],
    username: "",
    email: "",
    submitted: false
  }

  callbackFunction = (coordinates) => {
    this.setState({location: coordinates})
  }

  clearForm = () => {
    this.setState({
      name: '',
      found: false,
      desc: '',
      location: [39.3299, -76.6205],
      img: [],
      radius: 0,
      username: "",
      email: "",
    });

    document.getElementById("imagesUpload").value = "";

    let radios = document.getElementsByName('lostfoundradio');
    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }

    var boxes = document.getElementsByClassName('box');
    for (let box of boxes) {
      if (box.checked) {
        box.click();
      }
    }
  }

  onClick = (e) => {
    this.setState({found: true});
  }

  onSubmit = (e) => {

    e.preventDefault();

    this.props.submitForm(this.state.name, this.state.found, this.state.desc, this.state.location, this.state.tags,
      this.state.img, this.state.radius, getCookieValue("name"), getCookieValue("email"));
    // this.showSubmitToast();
    this.setState({ submitted: true});
    this.clearForm();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  validateFiles = (uploadedFiles) => {
    // Check to make sure images are below 12 Mib, and that they are only png or jpg
    let totalSize = 0;

    uploadedFiles.forEach(imgFile => {
      if (imgFile.type !== 'image/png' && imgFile.type !== 'image/jpeg') {
        alert('Only .png and .jpeg files are allowed.');
        return false;
      }
      totalSize += imgFile.size
    });

    totalSize = (totalSize / 1024) / 1024 // Convert from bytes to MiB
    if (totalSize >= 12) {
      let alertString = `Total image upload limit is 12 MB. You have uploaded ${totalSize} MB of images.`
      alert(alertString);
      return false;
    }
    return true;
  }

  fileSelectedHandler = (e) => {
    this.setState({
      img: []
    });

    var uploadedFiles = []
    for (let i = 0; i < e.target.files.length; i++) {
      uploadedFiles.push(e.target.files[i])
    }

    let filesOK = this.validateFiles(uploadedFiles);

    if (!filesOK) {
      document.getElementById("imagesUpload").value = "";
      return false;
    }

    this.setState({
      img: uploadedFiles
    });
  }

  lostFoundClick = (e) => {
    this.setState({ found: e.target.value === 'true' })
    // If item is a found item, user shouldn't have to select a radius
    if (e.target.value === 'true') {
      document.getElementById('formRadiusGroup').style.display = 'none';
    } else {
      document.getElementById('formRadiusGroup').style.display = 'block';
    }
  }

  radiusOnChange = (e) => {
    let selected = e.target.value;
    let distance = selected.substring(0, selected.length - 5);
    this.setState({ radius: parseInt(distance, 10)});
  }

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
            <Form.Label>Elephant allows college applicants to better understand how they would fit at each of their
               top schools and to put their best foot forward in their applications. With the help of real college 
               student mentors, this app will make college applications simpler and more transparent than ever before.</Form.Label>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

AboutDescription.propTypes = {
  submitForm: PropTypes.func.isRequired
}

export default AboutDescription;
