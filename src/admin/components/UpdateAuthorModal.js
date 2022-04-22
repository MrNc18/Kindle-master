import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import { InputField } from './atoms/InputField';
import { Grid, Typography } from '@material-ui/core';
import colors from './atoms/colors';
import { ModalCross } from './uploadBook/UploadBookModal';

const useStyles = makeStyles((theme) => ({

    alignRight: {
        textAlign: "right",
        marginBottom: "20px",
      },
      chartPanel: {
        marginTop: "20px",
      },
      Header: {
        fontWeight: "500",
        marginBottom: "30px",
        marginTop: "15px",
        fontSize: "18px",
        lineHeight: "23px",
        color: colors.blue,
        textAlign: "center",
      },
      confirmBtn: {
          width: "100%",
          textTransform: "capitalize",
          backgroundColor: colors.blue,
          marginBottom: "30px",
      },
      modalBox: {
          paddingTop: "10px",
          paddingBottom: "40px",
          borderRadius: "7px",
      },
   
  }));

export default (props) => {
    const classes = useStyles();

    const {handleClose,value} = props;
    const aid = value.id;
  const [fname, setFname] = useState(value.fname);
  const [lname, setLname] = useState(value.lname);
  const [email, setEmail] = useState(value.email);
  const [phone, setPhone] = useState(value.phone);
  const [address, setAddress] = useState(value.address);
    
    const editedValues = {
        id: aid,
        fname,
        lname,
        email,
        phone,
        address,
        image: '/images/author-10.jpg',
    }

  return (
    <Dialog className={classes.modalBox} open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
    <ModalCross onClick={handleClose} />
    <DialogContent>   
    <Typography className={classes.Header} component="p">
        UPDATE AUTHOR
    </Typography>
    <div>
    <InputField
        label="First Name"
        id="fname"
        value={editedValues}
        mendetory
        handleChange={(event) => setFname(event.target.value)}
      />
      <InputField
        label="Last Name"
        id="lname"
        value={editedValues}
        mendetory
        handleChange={(event) => setLname(event.target.value)}
      />
      <InputField
        label="Email"
        id="email"
        value={editedValues}
        mendetory
        handleChange={(event) => setEmail(event.target.value)}
      />
      <InputField
        label="Phone No."
        id="phone"
        value={editedValues}
        mendetory
        handleChange={(event) => setPhone(event.target.value)}
      />
      <InputField
        label="Address"
        id="address"
        value={editedValues}
        mendetory
        handleChange={(event) => setAddress(event.target.value)}
      />

      <Grid>
        <Button variant="contained" onClick={() => {
            handleClose();
            props.updateHandler(editedValues);
        }} 
        color="primary" 
        className={classes.confirmBtn} >
            Update Author
        </Button>
      </Grid>
    </div>
    </DialogContent>
  </Dialog>
  );
}
