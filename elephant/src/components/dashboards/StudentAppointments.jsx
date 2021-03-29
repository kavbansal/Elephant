import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StudentTitle from './StudentTitle';

// Generate Order Data
function createData(id, date, name, sessionType) {
  return { id, date, name, sessionType};
}

const rows = [
  createData(0, 'Mar 20, 2021', 'name', 'Essay Help'),
  createData(1, 'Mar 21, 2021', 'name', 'ACT Tutoring'),
  createData(2, 'Mar 22, 2021', 'name', 'School Overview'),
  createData(3, 'Mar 23, 2021', 'name', 'Choosing a Major'),
  createData(4, 'Mar 24, 2021', 'name', 'Application Help'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function StudentAppointments() {
  const classes = useStyles();
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.sessionType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more appointments
        </Link>
      </div>
    </React.Fragment>
  );
}