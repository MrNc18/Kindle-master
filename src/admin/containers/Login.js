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
import classNames from "classnames";
import { showAlert } from "./../../utils/showAlert";
import { loginUser } from "../services/authentication";
import { isValidEmail } from "./../../utils/validators";
import { setCookie } from "../../utils/cookie";
import { AUTH_TOKEN } from "./../../utils/cookie";

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
  forgotPasswordLink: {
    textAlign: "right",
    marginTop: "9px",
    fontSize: "10px",
  },
}));

export default () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [btnLoading, setBtnLoading] = useState();
  const [emailError, setEmailError] = useState("");

  const classes = useStyles();
  const history = useHistory();
  const value = {
    email,
    password,
    validation: {
      email: emailError,
    },
  };
  const enableBtn = password && email;

  const login = async () => {
    setEmailError("");
    if (!isValidEmail(email)) {
      setEmailError("Email is not valid.");
      return;
    }

    setBtnLoading(true);
    try {
      const response = await loginUser(email, password);
      showAlert("Logged in.", "success");
      setCookie(AUTH_TOKEN, response?.data?.data?.jwtToken);
      if (response?.data?.data?.role == 5) {
        history.push("/");

        return;
      }
      history.push("/admin/dashboard");
    } catch (error) {
      showAlert(error.data.massage, "error");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <AuthpageWrapper>
      <Grid container>
        <Typography className={classes.subHeader} component="p">
          Login to Eacacias
        </Typography>
        <div>
          <InputField
            label="Email Address"
            id="email"
            mendetory
            suffixIcon={mailSvg}
            value={value}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            mendetory
            suffixIcon={lockSvg}
            value={value}
            handleChange={(event) => setPassword(event.target.value)}
          />
          <Grid container>
            <Grid item sm={6}>
              <FormControlLabel
                label={<span className={classes.label}>Remember me</span>}
                control={
                  <Checkbox
                    color="primary"
                    size="small"
                    checked
                    onChange={() => {}}
                  />
                }
              />
            </Grid>
            <Grid
              item
              className={classNames(classes.forgotPasswordLink)}
              sm={6}
            >
              <Typography className={classes.smFont} component="span">
                <Link to="/admin/forgot-password">Forgot Password</Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <Button
              disabled={!enableBtn || btnLoading}
              variant="contained"
              color="primary"
              onClick={login}
            >
              {btnLoading ? "Logging in..." : "Log In"}
            </Button>
          </Grid>
          <Grid className={classes.helperText}>
            <Typography className={classes.smFont} component="span">
              Do you have an Acount?
            </Typography>
            <Typography className={classes.smFont} component="span">
              <Link to="/admin/sign-up">Sign Up</Link>
            </Typography>
          </Grid>
        </div>
      </Grid>
    </AuthpageWrapper>
  );
};
