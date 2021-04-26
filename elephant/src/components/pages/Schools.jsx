import React, { Component } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";

const styles = theme => ({
    appBar: {
        backgroundColor: "#0e5616"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')`,
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
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.5),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.8),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginBottom: '5%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(2em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '28px',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
});
            
               


export class Schools extends Component {
    constructor(props){
        super(props);
        this.state = {
          schoolList:[]
        }
    }

    getSchools(){
        axios.get("/api/collegeinfo").then((res) => {
            this.setState({ schoolList: res.data});
        });
    } 
    //const classes = useStyles();
    //const schoolList = getSchools();
    callSchools = this.getSchools();
    render() {
        const { classes } = this.props;
        //this.getSchools();
        return (
            <React.Fragment>
                <div className="App">
                    <AppBar className={classes.appBar} position="static">
                        <Toolbar>
                            <Typography variant="h6" color="primary" >
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box className={classes.hero}>
                        <Box>Schools</Box>

                    </Box>
                    <Container maxWidth="lg" className={classes.blogsContainer}>
                        <Typography variant="h4" className={classes.blogTitle}>
                            Find Your Best Fit College
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        

                        <Grid container spacing={3}>
                            {this.state.schoolList.map(school => (
                                <Grid item xs={12} sm={6} md={4} key={school.Id}>
                                <Card className={classes.card}>
                                    <CardActionArea a href="/schoolProfile">
                                        <CardMedia
                                            className={classes.media}
                                            image={school.image}
                                            title="Contemplative Reptile"
                                        />

                                        <Card>

                                        </Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {school.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Brief description
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
                                        <Box>
                                            <BookmarkBorderIcon />
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Grid>
                            ))}
                        </Grid>

                        <Box my={4} className={classes.paginationContainer}>
                        </Box>
                    </Container>
                </div>

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Schools);
