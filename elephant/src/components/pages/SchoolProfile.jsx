import React, { useState, useEffect } from 'react';
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
import { Button } from '@material-ui/core';
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
import axios from "axios";
import SchedulingModal from "../SignupForms/SchedulingModal";


function SchoolProfile() {
  const {isMentor, college, setCollege} = useContext(AuthContext);
  const [mentorList, setMentorList] = useState([]);
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

  const getMentors = e => {
    axios.get("/api/mentorinfo").then((res) => {
        let topMentors = []
        let i = 0;
        for (i = 0; i < 3; i++) {
          topMentors.push(res.data[i]);
        }
        setMentorList(topMentors);
    });
  } 

  useEffect(()=>{
      const tempList = getMentors();
  }, [])

  return (
    <React.Fragment>
      <Box className={classes.hero}>
        <Box>{college.name}</Box>
      </Box>

      <Card className={classes.card}>
          <CardActionArea>
              <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    By the Numbers
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  Average GPA: {college.gpa}
                  </Typography>
              </CardContent>
          </CardActionArea>
      </Card>

      {/*<h3>Deadlines</h3><br></br> */}
      <br></br>
      <h2>Top Questions</h2><br></br><br></br>
      <h2>Featured Mentors</h2>
      <Grid container spacing={3}>
        {mentorList.map(mentor => (
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {mentor.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Hi! I'm {mentor.name}. I'm a CS Major and I'd love to help! Please schedule a consultation and e-mail me at {mentor.email}.
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
                <SchedulingModal />
            </Card>
          </Grid>
        ))}
      </Grid>
      <br></br>
      <Button variant="contained" color="primary" href="/schoolMentors">
        View All Mentors
      </Button>
    </React.Fragment>
  );
}

export default SchoolProfile;
