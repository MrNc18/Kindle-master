import React from "react";
import { InputField } from "./../atoms/InputField";
import { Grid } from "@material-ui/core";

export default () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <InputField label="Your Name" mendetory />
      </Grid>

      <Grid item md={6}>
        <InputField type="number" label="Mobile Number" mendetory />
      </Grid>
    </Grid>
  );
};
