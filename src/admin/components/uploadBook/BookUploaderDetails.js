import React from "react";
import { InputField } from "./../atoms/InputField";
import { Grid } from "@material-ui/core";
import { SelectField } from "./../atoms/SelectField";
import { useSelector } from "react-redux";

export default ({ formName }) => {
  const { forms, models } = useSelector((state) => state);

  const commonProps = {
    formName,
    value: forms[formName],
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <InputField
          id="publisherName"
          {...commonProps}
          label="Your Name"
          mendetory
        />
      </Grid>

      <Grid item md={6}>
        <InputField
          {...commonProps}
          type="number"
          label="Mobile Number"
          mendetory
          id="number"
        />
      </Grid>
      <Grid item md={6}>
        <InputField id="email" {...commonProps} label="Your Email" mendetory />
      </Grid>
      <Grid item md={3}>
        <InputField id="city" {...commonProps} label="City" />
      </Grid>
      <Grid item md={3}>
        <InputField id="zip" {...commonProps} label="Zip Code" />
      </Grid>
      <Grid item md={6}>
        <InputField id="shop" {...commonProps} label="Shop" mendetory />
      </Grid>
      <Grid item md={6}>
        <InputField id="occupation" {...commonProps} label="Occupation" />
      </Grid>
    </Grid>
  );
};
