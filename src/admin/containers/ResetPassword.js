import { FormControlLabel, Grid, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputField } from "./../components/atoms/InputField";
import { mailSvg } from "./../../svgs/mail";
import AuthpageWrapper from "../components/AuthpageWrapper";
import { isValidEmail } from "./../../utils/validators";
import { forgotPassword, resetPassword } from "./../services/authentication";
import { showAlert } from "./../../utils/showAlert";
import { useHistory, useParams } from "react-router-dom";
import { lockSvg } from "./../../svgs/lock";

const useStyles = makeStyles((theme) => ({
  subHeader: {
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "15px",
  },
  smFont: { fontSize: "13px", marginBottom: "15px" },
}));

export default () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [btnLoading, setBbtnLoading] = useState("");
  const history = useHistory();
  const params = useParams();

  const formValue = {
    email,
    validation: { email: emailError },
  };

  const sendLink = async () => {
    setEmailError("");

    try {
      setBbtnLoading(true);
      await resetPassword(email, params.id);
      showAlert("Password reset done. Please login.", "success");
      history.push("/admin/login");
    } catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setBbtnLoading(false);
    }
  };
  return (
    <AuthpageWrapper goBackLink="/admin">
      <Grid container>
        <Typography className={classes.subHeader} component="p">
          Reset Password
        </Typography>
        <div>
          <InputField
            value={formValue}
            label="Enter new password"
            type="password"
            mendetory
            suffixIcon={lockSvg}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Button
            disabled={btnLoading || !email}
            variant="contained"
            color="primary"
            onClick={sendLink}
          >
            {btnLoading ? "Changing Password...." : "Change Passsword"}
          </Button>
        </div>
      </Grid>
    </AuthpageWrapper>
  );
};
