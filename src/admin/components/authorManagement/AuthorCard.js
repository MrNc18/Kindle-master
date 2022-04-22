import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Button, CardActionArea, Typography } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import UpdateAuthorModal from '../UpdateAuthorModal';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
      media: {
        height: 200,
    },
}));

// const deleteAuthor = (id) => {
//     alert(id);
// }

export default (props) => {
    const classes = useStyles();
    const { id,fname,lname,email,phone,address,image } = props;
    const [confirmDelete, setConfirmDelete] = React.useState();
    const [updateAuthor, setUpdateAuthor] = React.useState();
    const value = props;

    const getEditedValues = (editedValues) => {
      props.authEditHandler(editedValues)
    }
  
    return (
      <>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={`${fname} ${lname}`}
        />
        <CardContent style={{textAlign: 'center'}}>
          <Typography gutterBottom variant="h5" component="h2">
          {`${fname} ${lname}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {email}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent: 'space-between'}}>
        {/* <EditIcon onClick={() => setUpdateAuthor(true)} />
        <DeleteIcon onClick={() => setConfirmDelete(true)} /> */}
      </CardActions>
    </Card>
    {confirmDelete && (
      <ConfirmDeleteModal 
      handleClose={() => setConfirmDelete(false)} 
      handleCloseConfirm={() => {
        setConfirmDelete(false)
        props.deleteAuthor(id)
      }} />
    )}
    {
      updateAuthor && (
        <UpdateAuthorModal
        handleClose={() => setUpdateAuthor(false)}
        value={value}
        updateHandler={getEditedValues}
        />
      )
    }
    </>
    );
  };
