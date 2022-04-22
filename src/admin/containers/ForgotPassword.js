import { FormControlLabel, Grid, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputField } from "./../components/atoms/InputField";
import { mailSvg } from "./../../svgs/mail";
import AuthpageWrapper from "../components/AuthpageWrapper";
import { isValidEmail } from "./../../utils/validators";
import { forgotPassword } from "./../services/authentication";
import { showAlert } from "./../../utils/showAlert";
import { useHistory, useParams } from "react-router-dom";

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

  const formValue = {
    email,
    validation: { email: emailError },
  };

  const sendLink = async () => {
    setEmailError("");
    if (!isValidEmail(email)) {
      setEmailError("Please enter valid email.");
      return;
    }

    try {
      setBbtnLoading(true);
      await forgotPassword(email);
      history.push("/admin/login");
      showAlert("Recovery link sent to your mail, Please check..", "success");
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
          Forgot Password
        </Typography>
        <Typography className={classes.smFont} component="p">
          To reset your password , enter your email address and we will send you
          an email with instructions.
        </Typography>
        <div>
          <InputField
            value={formValue}
            label="Email Address"
            mendetory
            suffixIcon={mailSvg}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Button
            disabled={btnLoading || !email}
            variant="contained"
            color="primary"
            onClick={sendLink}
          >
            {btnLoading ? "Sending Recovery Link...." : "Send Recover Link"}
          </Button>
        </div>
      </Grid>
    </AuthpageWrapper>
  );
};
