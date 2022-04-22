import React, { useState } from "react";
import { useEffect } from "react";
import { InputFieldCU } from "./../components/atoms/InputFieldCU";
import { isValidEmail } from "./../utils/validators";
import { showAlert } from "./../utils/showAlert";
import { registerUser } from "./../admin/services/authentication";

export default function RegisterForm({ match, history }) {
  useEffect(() => {
    const type = Number(match?.params?.type);
    if (![3, 4, 5].includes(type)) {
      history.push("/register");
    }
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBbtnLoading] = useState("");
  const [rememberMe, setRememberMe] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [gender, setGender] = useState("");

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
        role: match?.params?.type,
      });
      history.push("/login");
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
    confirmPassword,
    gender,
    validation: {
      password: passwordError,
      email: emailError,
      confirmPassword: confirmPasswordError,
    },
  };

  const buttonEnabled =
    firstName && lastName && password && email && confirmPassword && gender;

  return (
    <div>
      <div className="space-01"></div>
      <section className="container">
        <div className="col-12">
          <div className="form-login">
            <h1>
              <a href="#" className="active">
                register
              </a>
            </h1>
              <div className="row">
                <div className="col-12 col-md-6 col-sm-6">
                  <InputFieldCU
                    label="First Name"
                    handleChange={(event) => setFirstName(event.target.value)}
                    mendetory
                    value={value}
                    id="firstName"
                  />
                </div>
                <div className="col-12 col-md-6 col-sm-6">
                  <InputFieldCU
                    label="Last Name"
                    handleChange={(event) => setLastName(event.target.value)}
                    mendetory
                    id="lastName"
                    value={value}
                  />
                </div>
                <div className="col-12">
                  <InputFieldCU
                    label="Email Address"
                    handleChange={(event) => setEmail(event.target.value)}
                    mendetory
                    id="email"
                    value={value}
                  />
                </div>
                <div className="col-12 form-group">
                  <p>Gender:&nbsp;</p>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      checked={gender === "Other"}
                      onChange={() => setGender("Other")}
                    />
                    <label className="form-check-label" for="inlineRadio3">
                      Other
                    </label>
                  </div>
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
                  <InputFieldCU
                    label="Confirm Password"
                    handleChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    mendetory
                    id="confirmPassword"
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
                        By clicking "Register", I agree to the{" "}
                        <a href="#" className="float-none">
                          Terms and Condition
                        </a>{" "}
                        and{" "}
                        <a href="#" className="float-none">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    disabled={!buttonEnabled || btnLoading}
                    className="btn btn-primary w-100"
                    onClick={signIn}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <div className="form-check text-center mt-4">
                      <label className="form-check-label" for="gridCheck">
                        Have already an account?{" "}
                        <a href="#" className="float-none">
                          Login here
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
      <div className="space-01"></div>
    </div>
  );
}
