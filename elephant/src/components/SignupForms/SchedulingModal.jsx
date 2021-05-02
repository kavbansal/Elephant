import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
import axios from "axios";
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function SchedulingModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [sessionType, setSessionType] = React.useState('');
  const [dateTime, setDateTime] = useState('');
  const { userID, mentID } = useContext(AuthContext);

  const handleChange = (event) => {
    setSessionType(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeDateTime = (e) => {
    setDateTime(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append("studentId", userID);
    data.append("mentorId", mentID);
    data.append("sessionType", sessionType);
    data.append("dateTime", dateTime);

    if (dateTime !== "null" && dateTime !== "undefined" && sessionType !== "null" && sessionType !== "undefined") {
        ///alert(password);
        axios({
            method: 'post',
            url: '/api/appointmentinfo',
            data: data,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          setOpen(false);
        });
    } else {
        alert("Please fill out all fields.");
    }
    
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Schedule a Session</h2>
      <form onSubmit={onSubmit} className={classes.container} noValidate>
        <TextField
            id="datetime-local"
            onChange={onChangeDateTime}
            label="Next appointment"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
        />
        <FormLabel component="legend">Session Type</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={sessionType} onChange={handleChange}>
            <FormControlLabel value="essay" control={<Radio />} label="Essay Help" />
            <FormControlLabel value="test" control={<Radio />} label="Test Prep" />
            <FormControlLabel value="overview" control={<Radio />} label="School Overview" />
            <FormControlLabel value="major" control={<Radio />} label="Choosing a Major" />
            <FormControlLabel value="application" control={<Radio />} label="Application Help" />
        </RadioGroup>
        <Button
            type="submit"
          >
            Submit
          </Button>
        </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Schedule a Session
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}