import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "./colors";
import { ModalCross } from './../uploadBook/UploadBookModal';

const useStyles = makeStyles((theme) => ({
  modalBox: {
    paddingTop: "10px",
    paddingBottom: "40px",
    borderRadius: "7px",
  },

  modalBody: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.blue,
    paddingTop: "10px",
  },

  btn: {
    width: "100px",
  },

  modalFooter: {
    justifyContent: "center",
    padding: "15px",
  },
}));

export default ({ label, onConfirm, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.modalBox}
      open={true}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
    <ModalCross onClick={onClose} />
      <DialogContent className={classes.modalBody}>
        <img src="/images/delete.png" />
        <Typography className={classes.modalBody}>{label}</Typography>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button
          className={classes.btn}
          variant="contained"
          onClick={onClose}
          color="default"
        >
          No
        </Button>
        <Button
          className={classes.btn}
          variant="contained"
          onClick={onConfirm}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
