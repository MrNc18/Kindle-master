import React, { useState } from "react";
import { loginUser } from "../admin/services/authentication";
import { setCookie } from "../utils/cookie";
import { InputFieldCU } from "./../components/atoms/InputFieldCU";
import { showAlert } from "./../utils/showAlert";
import { isValidEmail } from "./../utils/validators";
import { AUTH_TOKEN } from "./../utils/cookie";

export default function Login({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [btnLoading, setBtnLoading] = useState();
  const [emailError, setEmailError] = useState("");

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
    <div>
      <div className="space-01"></div>
      <section className="container">
        <div className="col-12">
          <div className="form-login">
            <h1>
              <a href="#" className="active">
                Login
              </a>{" "}
              <a href="/register">register</a>
            </h1>
            <div className="row">
              <div className="col-12">
                <InputFieldCU
                  label="Email Address"
                  handleChange={(event) => setEmail(event.target.value)}
                  mendetory
                  id="email"
                  value={value}
                />
              </div>
              <div className="col-12">
                <InputFieldCU
                  label="Password"
                  handleChange={(event) => setPassword(event.target.value)}
                  mendetory
                  id="password"
                  value={value}
                  type="password"
                />
              </div>
              <div className="col-12">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" for="gridCheck">
                      Remember me
                    </label>
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <button
                  disabled={!enableBtn || btnLoading}
                  className="btn btn-primary"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="space-01"></div>
    </div>
  );
}
