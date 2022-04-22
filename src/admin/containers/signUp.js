import {
  FormControlLabel,
  Grid,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../components/atoms/colors";
import { InputField } from "./../components/atoms/InputField";
import { mailSvg } from "./../../svgs/mail";
import { lockSvg } from "../../svgs/lock";
import { Link, useHistory } from "react-router-dom";
import AuthpageWrapper from "../components/AuthpageWrapper";
import { userSvg } from "./../../svgs/user";
import { registerUser } from "./../services/authentication";
import { showAlert } from "./../../utils/showAlert";
import { isPasswordValid, isValidEmail } from "./../../utils/validators";

const useStyles = makeStyles((theme) => ({
  subHeader: {
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "10px",
  },
  helperText: {
    marginBottom: "10px",
    marginTop: "10px",
    color: colors.disabled,
  },
  smFont: { fontSize: "13px" },
  img: {
    width: "100px",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "13px",
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBbtnLoading] = useState("");
  const [rememberMe, setRememberMe] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signIn = async () => {
    setEmailError("");
    setPasswordError("");
    let hasError = false;
    if (!isValidEmail(email)) {
      hasError = true;
      setEmailError("Email is not valid.", "error");
    }

    // if (!isPasswordValid(password)) {
    //   hasError = true;
    //   setPasswordError("Password is not valid.", "error");
    // }

    if (hasError) return;

    try {
      setBbtnLoading(true);
      await registerUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: 2,
      });
      history.push("/admin/login");
      showAlert("Sign-up successfull.", "success");
    } catch (error) {
      showAlert(error.data.massage, "error");
    } finally {
      setBbtnLoading(false);
    }
  };

  const value = {
    firstName,
    lastName,
    email,
    password,
    validation: {
      password: passwordError,
      email: emailError,
    },
  };

  const buttonEnabled = firstName && lastName && password && email;

  return (
    <AuthpageWrapper>
      <Grid container>
        <Typography className={classes.subHeader} component="p">
          Sign Up to Eacacias
        </Typography>
        <div>
          <InputField
            label="First Name"
            handleChange={(event) => setFirstName(event.target.value)}
            mendetory
            suffixIcon={userSvg}
            value={value}
            id="firstName"
          />
          <InputField
            label="Last Name"
            handleChange={(event) => setLastName(event.target.value)}
            mendetory
            suffixIcon={userSvg}
            id="lastName"
            value={value}
          />
          <InputField
            label="Email Address"
            handleChange={(event) => setEmail(event.target.value)}
            mendetory
            suffixIcon={mailSvg}
            id="email"
            value={value}
          />
          <InputField
            label="Password"
            handleChange={(event) => setPassword(event.target.value)}
            mendetory
            suffixIcon={lockSvg}
            id="password"
            value={value}
            type="password"
          />
          <FormControlLabel
            label={<span className={classes.label}>Remember me</span>}
            control={
              <Checkbox
                color="primary"
                size="small"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            }
          />
          <Grid>
            <Button
              disabled={!buttonEnabled || btnLoading}
              onClick={signIn}
              variant="contained"
              color="primary"
            >
              {btnLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Grid>
          <Grid className={classes.helperText}>
            <Typography className={classes.smFont} component="span">
              Already have an Acount?
            </Typography>
            <Typography className={classes.smFont} component="span">
              <Link to="/admin/">Log In</Link>
            </Typography>
          </Grid>
        </div>
      </Grid>
    </AuthpageWrapper>
  );
};
