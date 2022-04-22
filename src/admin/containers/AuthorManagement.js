import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Navbar from "../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AuthorCard from "../components/authorManagement/AuthorCard";
import { InputField } from "../components/atoms/InputField";
import colors from "../components/atoms/colors";
import { ModalCross } from "./../components/uploadBook/UploadBookModal";

const useStyles = makeStyles(() => ({
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

export default () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const generateId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onlyClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setAuthList([
      ...authList,
      {
        id: generateId(),
        fname,
        lname,
        email,
        phone,
        address,
        image: "/images/author-10.jpg",
      },
    ]);
  };

  const authors = [
    {
      id: generateId(),
      fname: "Diana",
      lname: "Flaska",
      email: "diana.flaska@gmail.com",
      phone: "1234567890",
      address: "Hadapsar, Pune",
      image: "/images/author-10.jpg",
    },
    {
      id: generateId(),
      fname: "Rahul",
      lname: "Mukherjee",
      email: "diana.flaska@gmail.com",
      phone: "1234567890",
      address: "Hadapsar, Pune",
      image: "/images/author-10.jpg",
    },
    {
      id: generateId(),
      fname: "Diana",
      lname: "Flaska",
      email: "diana.flaska@gmail.com",
      phone: "1234567890",
      address: "Hadapsar, Pune",
      image: "/images/author-10.jpg",
    },
    {
      id: generateId(),
      fname: "Diana",
      lname: "Flaska",
      email: "diana.flaska@gmail.com",
      phone: "1234567890",
      address: "Hadapsar, Pune",
      image: "/images/author-10.jpg",
    },
  ];

  const [authList, setAuthList] = useState(authors);

  const removeAuthorHandler = (id) => {
    const newAuthList = authList.filter((auth) => {
      return auth.id !== id;
    });
    setAuthList(newAuthList);
  };

  const authorInfoEdit = (editedValues) => {
    console.log(editedValues);
    const { id, fname, lname, email, phone, address, image } = editedValues;
    setAuthList(
      authList.map((auth) => {
        return auth.id === id ? { ...editedValues } : auth;
      })
    );
  };

  return (
    <Navbar>
      <Grid item md={12} className={classNames(classes.alignRight)}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Author
        </Button>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={6}>
          {authList.map((auth) => {
            return (
              <Grid item md={3}>
                <AuthorCard
                  {...auth}
                  deleteAuthor={removeAuthorHandler}
                  authEditHandler={authorInfoEdit}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Dialog
        className={classes.modalBox}
        open={open}
        onClose={onlyClose}
        aria-labelledby="form-dialog-title"
      >
        <ModalCross onClick={handleClose} />
        <DialogContent>
          <Typography className={classes.Header} component="p">
            ADD AUTHOR
          </Typography>
          <div>
            <InputField
              label="First Name"
              id="fname"
              value={fname}
              mendetory
              handleChange={(event) => setFname(event.target.value)}
            />
            <InputField
              label="Last Name"
              id="lname"
              value={lname}
              mendetory
              handleChange={(event) => setLname(event.target.value)}
            />
            <InputField
              label="Email"
              id="email"
              value={email}
              mendetory
              handleChange={(event) => setEmail(event.target.value)}
            />
            <InputField
              label="Phone No."
              id="phone"
              value={phone}
              mendetory
              handleChange={(event) => setPhone(event.target.value)}
            />
            <InputField
              label="Address"
              id="address"
              value={address}
              mendetory
              handleChange={(event) => setAddress(event.target.value)}
            />
            <Grid>
              <Button
                variant="contained"
                onClick={handleClose}
                color="primary"
                className={classes.confirmBtn}
              >
                Add Author
              </Button>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </Navbar>
  );
};
