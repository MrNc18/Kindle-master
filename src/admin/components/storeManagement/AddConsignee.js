import React from "react";
import { InputField } from "./../atoms/InputField";
import { Grid } from "@material-ui/core";
import { mailSvg } from './../../../svgs/mail';
import { userSvg } from './../../../svgs/user';

export default ({ value, formName }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <InputField
          label="First Name"
          mendetory
          suffixIcon={userSvg}
          value={value}
          id="firstName"
          formName={formName}
        />
      </Grid>
      <Grid item md={12}>
        <InputField
          label="Last Name"
          mendetory
          suffixIcon={userSvg}
          id="lastName"
          value={value}
          formName={formName}
        />
      </Grid>
      <Grid item md={12}>
        <InputField
          label="Email Address"
          mendetory
          suffixIcon={mailSvg}
          id="email"
          value={value}
          formName={formName}
        />
      </Grid>
    </Grid>
  );
};
