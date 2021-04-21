import React, { Component } from 'react';
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

export default class SchoolMentors extends Component {
  
  render() {
    
    return (
      <React.Fragment>
        <h2>All Mentors at Blank Blankins University</h2>
        <br></br>
        <Grid container spacing={3}>
        <Grid item xs={12}>
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
          </Grid>
          <br></br>
          <Grid item xs = {12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                  <CardActionArea href="/schoolProfile">
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Mentor 4
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Hi! I'm Mentor 4. I'm a Public Health Major.
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
                            Mentor 5
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Hi! I'm Mentor 5. I'm a ChemBE Major.
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
                            Mentor 6
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Hi! I'm Mentor 6. I'm a MechE Major.
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
          </Grid>
          <br></br>
          <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                  <CardActionArea href="/schoolProfile">
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            Mentor 7
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Hi! I'm Mentor 7. I'm a Neuro Major.
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
                            Mentor 8
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Hi! I'm Mentor 8. I'm an English Major.
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
                            Mentor 9
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Hi! I'm Mentor 9. I'm a Biophysics Major.
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
          </Grid>
        </Grid>
        <br></br>
        <Button variant="contained" color="primary" href="/schoolProfile">
          Return to School Profile
        </Button>
      </React.Fragment>
    );
  }
}
