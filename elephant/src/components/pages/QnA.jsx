import React from 'react';

import NavPills from "./NavPills.jsx";
import GridItem from "../Grid/GridItem";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';
import {CardTitle} from "react-bootstrap";
import Button from "../item/modules/components/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles";
import PostAddIcon from '@material-ui/icons/PostAdd';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "10000px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/1634213/pexels-photo-1634213.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')`,
        height: "240px",
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.5),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.8),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginTop: '2%',
        marginBottom: '1%',
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
        fontSize: '20px',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function QnA(){
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <GridItem xs={12} sm={12} md={12} lg={12}>
            <Box className={classes.hero}>
                <Box>Q&A</Box>
            </Box>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search or add a Post..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            <Button
                style={{display: 'flex', justifyContent: 'left', marginLeft: "2%", borderRadius: "10"}}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<PostAddIcon />}>
                New Post
            </Button>
        <NavPills
            color="info"
            horizontal={{
                tabsGrid: { xs: 12, sm: 6, md: 4 , lg: 3},
                contentGrid: { xs: 12, sm: 6, md: 8, lg: 9}
                // tabsGrid: { xs: 12, sm: 4, md: 4 , lg: 4},
                // contentGrid: { xs: 12, sm: 8, md: 8, lg: 8}
            }}
            tabs={[
                {
                    tabButton: (
                        <span>
                            <p style={{marginBottom: "-1px", fontSize: "16px"}}>
                                <b>
                                Application Material Requirements
                                </b>
                            </p>
                                Hi, would it be possible to post some requirements for application Materials? Include the deadline information...
                        </span>
                    ),
                    tabContent: (
                        <span>
                          <Card className={classes.root}>
                              <CardHeader
                                  avatar={
                                      <Avatar aria-label="recipe" className={classes.avatar}>
                                          ?
                                      </Avatar>
                                  }
                                  action={
                                      <IconButton aria-label="settings">
                                          <MoreVertIcon />
                                      </IconButton>
                                  }
                                  title="Application Material Requirements"
                                  subheader="September 19, 2018"
                              />
                              {/*<CardMedia*/}
                              {/*    className={classes.media}*/}
                              {/*    image="/static/images/cards/paella.jpg"*/}
                              {/*    title="Paella dish"*/}
                              {/*/>*/}

                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Hi, would it be possible to post some requirements for application Materials? Include the deadline information would be helpful!
                                </Typography>
                              </CardContent>
                              <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                  <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                  <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                              </CardActions>
                              <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent style={{textAlign: "left"}}>
                                  <Typography paragraph>Expert Answer:</Typography>
                                  <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                    minutes.
                                  </Typography>
                                  <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                  </Typography>
                                  <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                  </Typography>
                                  <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                  </Typography>
                                </CardContent>
                              </Collapse>
                          </Card>
              <br />
              <Card className={classes.root} variant="outlined" style={{textAlign: "left"}}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Followup Discussion
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Yixin Pan
                    </Typography>
                    <Typography variant="body2" component="p">
                      Here's another resource I found helpful for describing high-level differences between LSA, pLSA, and LDA: 
                        https://medium.com/nanonets/topic-modeling-with-lsa-psla-lda-and-lda2vec-555ff65b0b05
                      <br />
                        {'"Hope this will be helpful"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Reply</Button>
                  </CardActions>
                </Card>
            </span>
                    )
                },
                {
                    tabButton: (
                        <span>
                            <p style={{marginBottom: "-1px", fontSize: "16px"}}>
                                <b>
                                Question about Major Selection
                                </b>
                            </p>
                                Hi, would it be possible to post some resources for Major Selection? I'm interested in the Engineering Field!
                        </span>
                    ),
                    tabContent: (
                        <span>
                          <Card className={classes.root}>
                              <CardHeader
                                  avatar={
                                      <Avatar aria-label="recipe" className={classes.avatar}>
                                          ?
                                      </Avatar>
                                  }
                                  action={
                                      <IconButton aria-label="settings">
                                          <MoreVertIcon />
                                      </IconButton>
                                  }
                                  title="Question about Major Selection"
                                  subheader="December 14, 2020"
                              />
                              {/*<CardMedia*/}
                              {/*    className={classes.media}*/}
                              {/*    image="/static/images/cards/paella.jpg"*/}
                              {/*    title="Paella dish"*/}
                              {/*/>*/}

                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   Hi, would it be possible to post some resources for Major Selection? I'm interested in the Engineering Field!
                                </Typography>
                              </CardContent>
                              <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                  <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                  <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                              </CardActions>
                              <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent style={{textAlign: "left"}}>
                                  <Typography paragraph>Expert Answer:</Typography>
                                  <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                    minutes.
                                  </Typography>
                                  <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                  </Typography>
                                  <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                  </Typography>
                                  <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                  </Typography>
                                </CardContent>
                              </Collapse>
                          </Card>
              <br />
              <Card className={classes.root} variant="outlined" style={{textAlign: "left"}}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Followup Discussion
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Yixin Pan
                    </Typography>
                    <Typography variant="body2" component="p">
                      Here's another resource I found helpful for describing high-level differences between LSA, pLSA, and LDA: 
                        https://medium.com/nanonets/topic-modeling-with-lsa-psla-lda-and-lda2vec-555ff65b0b05
                      <br />
                        {'"Hope this will be helpful"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Reply</Button>
                  </CardActions>
                </Card>
            </span>
                    )
                },
                {
                    tabButton: (
                        <span>
                            <p style={{marginBottom: "-1px", fontSize: "16px"}}>
                                <b>
                                Financial Aid Resources
                                </b>
                            </p>
                                Hi, would it be possible to post some financial aid resources? Both Merit-based and Need-based are...
                        </span>
                    ),
                    tabContent: (
                        <span>
                          <Card className={classes.root}>
                              <CardHeader
                                  avatar={
                                      <Avatar aria-label="recipe" className={classes.avatar}>
                                          ?
                                      </Avatar>
                                  }
                                  action={
                                      <IconButton aria-label="settings">
                                          <MoreVertIcon />
                                      </IconButton>
                                  }
                                  title="Financial Aid Resources"
                                  subheader="September 14, 2016"
                              />
                              {/*<CardMedia*/}
                              {/*    className={classes.media}*/}
                              {/*    image="/static/images/cards/paella.jpg"*/}
                              {/*    title="Paella dish"*/}
                              {/*/>*/}

                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Hi, would it be possible to post some financial aid resources? Both Merit-based and Need-based are under my consideration.
                                </Typography>
                              </CardContent>
                              <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                  <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                  <ShareIcon />
                                </IconButton>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                              </CardActions>
                              <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent style={{textAlign: "left"}}>
                                  <Typography paragraph>Expert Answer:</Typography>
                                  <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                    minutes.
                                  </Typography>
                                  <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                  </Typography>
                                  <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                  </Typography>
                                  <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                  </Typography>
                                </CardContent>
                              </Collapse>
                          </Card>
              <br />
              <Card className={classes.root} variant="outlined" style={{textAlign: "left"}}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Followup Discussion
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Yixin Pan
                    </Typography>
                    <Typography variant="body2" component="p">
                      Here's another resource I found helpful for describing high-level differences between LSA, pLSA, and LDA: 
                        https://medium.com/nanonets/topic-modeling-with-lsa-psla-lda-and-lda2vec-555ff65b0b05
                      <br />
                        {'"Hope this will be helpful"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Reply</Button>
                  </CardActions>
                </Card>
            </span>
                    )
                }
            ]}
        />
        </GridItem>
    );
}