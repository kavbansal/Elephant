import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import classes from './Schools';
import { Button } from '@material-ui/core';
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";



function SchoolProfile() {
  const {college, setCollege} = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: "url(" + college.image + ")",
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    }
  }));
  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box className={classes.hero}>
        <Box>{college.name}</Box>
      </Box>
      {/* <h3>Statistics (GPA, SAT, admission rate)</h3>
      <h3>Deadlines</h3><br></br> */}
      <h2>Top Questions</h2><br></br><br></br>
      <h2>Featured Mentors</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
              <CardActionArea href="/schoolProfile">
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Mentor 1
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Hi! I'm Mentor 1. I'm a CS Major.
                      </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                      <Box ml={2}>
                          <Typography variant="subtitle2" component="p">
                          </Typography>
                          <Typography variant="subtitle2" color="textSecondary" component="p">
                              
                          </Typography>
                      </Box>
                  </Box>
              </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
              <CardActionArea href="/schoolProfile">
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Mentor 2
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Hi! I'm Mentor 2. I'm an AMS Major.
                      </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                      <Box ml={2}>
                          <Typography variant="subtitle2" component="p">
                          </Typography>
                          <Typography variant="subtitle2" color="textSecondary" component="p">
                              
                          </Typography>
                      </Box>
                  </Box>
              </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
              <CardActionArea href="/schoolProfile">
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Mentor 3
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          Hi! I'm Mentor 3. I'm a BME Major.
                      </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                      <Box ml={2}>
                          <Typography variant="subtitle2" component="p">
                          </Typography>
                          <Typography variant="subtitle2" color="textSecondary" component="p">
                              
                          </Typography>
                      </Box>
                  </Box>
              </CardActions>
          </Card>
        </Grid>
      </Grid>
      <br></br>
      <Button variant="contained" color="primary" href="/schoolMentors">
        View All Mentors
      </Button>
    </React.Fragment>
  );
}

export default SchoolProfile;
