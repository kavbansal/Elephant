import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StudentTitle from './StudentTitle';
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function StudentAppointments() {
  const classes = useStyles();
  /* function createData(id, date, name, sessionType) {
    return { id, date, name, sessionType};
  } */
  
  const [appointments, setAppointments] = useState([]);
  const { userID, college } = useContext(AuthContext);
  
  const getAppointments = e => {
    axios.get("/api/appointmentinfo/" + userID).then((res) => {
      setAppointments(res.data);
    });
  } 
  
  useEffect(()=>{
    getAppointments();
  }, [])

  return (
    <React.Fragment>
      <StudentTitle>Upcoming Appointments</StudentTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Session</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.dateTime}</TableCell>
              <TableCell>name</TableCell>
              <TableCell>{row.sessionType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#">
          See more appointments
        </Link>
      </div>
    </React.Fragment>
  );
}