import React from "react";
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";

import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Hidden
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  }
});

const navLinks = [
  { title: `About`, path: `/about` },
  /* { title: `Schools`, path: `/schools` }, */
  /* { title: `Dashboard`, path: `/studentDashboard` }, */
  /* { title: `Mentor`, path: `/mentorDashboard` }, */
  /* { title: `Login`, path: `/signin` }, */
  /* { title: 'Q&A', path: '/QnA'}, */
]

const Navigation = () => {
  const classes = useStyles();
  const { userID } = useContext(AuthContext);
  //alert(userID);
  return (
    //<div>
    <AppBar position="fixed">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <img src='/LOGO_temp.PNG' alt='logo' width="70" height="45"/>
          </IconButton>
          <Hidden smDown>
            <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                  <a href={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </a>
              ))}
              {userID !== "null" && userID !== "undefined" ? (
                <a href='/schools' key='Schools' className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary='Schools' />
                </ListItem>
                </a>
              ) : null}
              {userID !== "null" && userID !== "undefined" ? (
                <a href='/QnA' key='Q&A' className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary='Q&A' />
                </ListItem>
                </a>
              ) : null}
              {userID !== "null" && userID !== "undefined" ? (
                <a href='/studentDashboard' key='Dashboard' className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary='Dashboard' />
                </ListItem>
                </a>
              ) : null}
              {userID !== "null" && userID !== "undefined" ? (
                <a href='/signout' key='Logout' className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary='Logout' />
                  </ListItem>
                </a>
                ) : (
                <a href='/signin' key='Login' className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary='Login' />
                  </ListItem>
                </a>
                )}
            </List>
          </Hidden>
          <Hidden mdUp>
            <SideDrawer navLinks={navLinks} />
          </Hidden>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
