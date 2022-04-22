import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    padding: 10,
  },
  header: {
    padding: '0 0 10px',
  },
  media: {
    height: 0,
    paddingTop: '70.25%', 
    borderRadius: 8,
  },
  avatar: {
    borderRadius: 7,
  },
}));

export default ({ image,name,profession,published_on,post_img }) => {
    const classes = useStyles();
  
    return (
        <Card className={classes.root}>
        <CardHeader className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img src={image} />
            </Avatar>
          }
          title={name}
          subheader={`${profession} . ${published_on}`}
        />
        <CardMedia
        className={classes.media}
          image={post_img}
          title="Demo post"
        />
      </Card>
    );
  };
