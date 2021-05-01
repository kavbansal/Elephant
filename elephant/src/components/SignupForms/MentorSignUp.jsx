import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
import axios from "axios";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function MentorSignUp() {
  const classes = useStyles();
  const [schoolList, setSchoolList] = useState([]);
  const [schoolID, setSchoolID] = React.useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const {
    name,
    setName,
    email,
    setEmail,
    setUserID,
    isMentor,
    setMentor,
  } = useContext(AuthContext);
  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleChange = (event) => {
    setSchoolID(event.target.value);
  };
  const getSchools = e => {
    axios.get("https://elephant-csie.herokuapp.com/api/collegeinfo").then((res) => {
            setSchoolList(res.data);
        });
  } 

  useEffect(()=>{
    getSchools();
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("isMentor", isMentor);
    data.append("school", schoolID);

    if (name !== "null" && name !== "undefined" && email !== "null" && email !== "undefined" 
    & email !== "null" && email !== "undefined" & schoolID !== "null" && schoolID !== "undefined") {
        ///alert(password);
        axios({
            method: 'post',
            url: 'https://elephant-csie.herokuapp.com/api/userinfo',
            data: data,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            setUserID(res.data[0].id);
            setEmail(res.data[0].email);
            setName(res.data[0].name);
            setMentor(res.data[0].isMentor);
            history.push("/schools");
        });
    } else {
        alert("Please fill out all fields.");
    }
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeName}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangeEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangePassword}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">School</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={schoolID}
                    onChange={handleChange}
                    label="School"
                    >
                    {schoolList.map(school => (
                        <MenuItem value={school.id}>{school.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}