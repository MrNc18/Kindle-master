import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import { ModalCross } from './uploadBook/UploadBookModal';

const useStyles = makeStyles((theme) => ({

    modalBox: {
        alignItems: "center",
        padding: 20,
    },
    
    img: {
      width: "25%",
    },
   
  }));

export default ({handleClose,handleCloseConfirm}) => {
    const classes = useStyles();
  return (
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{alignItems: 'center', padding: '20px'}}
      >
        <ModalCross onClick={handleClose} />
          <img className={classes.img} src="/images/delete.png" />
        <DialogTitle id="alert-dialog-title">{"ARE YOU SURE ? DELETE THIS CUSTOMER"}</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="secondary">
            No
          </Button>
          <Button variant="contained" color="primary" onClick={handleCloseConfirm}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}
