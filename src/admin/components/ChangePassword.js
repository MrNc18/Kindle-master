import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "./atoms/colors";
import { InputField } from "./atoms/InputField";
import { eye } from "../../svgs/eye";
import { showAlert } from "../../utils/showAlert";
import { useSelector } from "react-redux";
import { changePassword } from "../services/authentication";
import { ModalCross } from './uploadBook/UploadBookModal';

const useStyles = makeStyles((theme) => ({
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

export default ({ handleClose }) => {
  const classes = useStyles();
  const [disableBtn, setDisableBtn] = useState();
  const [formData, setFormData] =useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const userDetails = useSelector((state) => state.forms.userDetails) || {};

  const updatePassword = async () => {
    const {oldPassword,newPassword,confirmNewPassword} = formData;
    try {
      if (newPassword !== confirmNewPassword) {
        showAlert("Password & Confirm password must match", "error");
      } else {
        setDisableBtn(true);
        const payload = {
          oldPassword,
          password:newPassword,
          email:userDetails.email
        };
        // console.log(payload);
        const resp = await changePassword(payload);
        console.log(resp);
        showAlert("Updated Password.", "success");
        handleClose();
      }
    } 
    catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setDisableBtn(false);
    }
  };

  const enableButton =
  formData.oldPassword &&
  formData.newPassword &&
  formData.confirmNewPassword;

  return (
    <div>
      <Dialog
        className={classes.modalBox}
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <ModalCross onClick={handleClose} />
        <DialogContent>
          <Typography className={classes.Header} component="p">
            CHANGE PASSWORD
          </Typography>
          <div>
            <InputField
              value={formData}
              id="oldPassword"
              type="password"
              label="Old Password"
              mendetory
              suffixIcon={eye}
              handleChange={e => setFormData({...formData, oldPassword:e.target.value})}
            />
            <InputField
              value={formData}
              id="newPassword"
              type="password"
              label="New Password"
              mendetory
              suffixIcon={eye}
              handleChange={e => setFormData({...formData, newPassword:e.target.value})}
            />
            <InputField
              value={formData}
              id="confirmNewPassword"
              type="password"
              label="Confirm Password"
              mendetory
              suffixIcon={eye}
              handleChange={e => setFormData({...formData, confirmNewPassword:e.target.value})}
            />
            <Grid>
              <Button
                variant="contained"
                onClick={updatePassword}
                color="primary"
                className={classes.confirmBtn}
                disabled={!enableButton || disableBtn}
              >
                Update Password
              </Button>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
