import React from "react";
import { InputField } from "./../atoms/InputField";
import { Grid } from "@material-ui/core";
import ImageBlock from "../atoms/ImageBlock";
import { FormModel } from './../../../model/FormModel';

export default ({ value, formName }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <InputField
          label="Store Name"
          mendetory
          value={value}
          id="storeName"
          formName={formName}
        />
      </Grid>
      <Grid item md={12}>
        <InputField
          label="Store Type"
          mendetory
          id="storeType"
          value={value}
          formName={formName}
        />
      </Grid>
      <Grid item md={12}>
        <InputField
          label="Store Address"
          mendetory
          id="storeAddress"
          value={value}
          formName={formName}
        />
      </Grid>
      <Grid item md={12}>
        <InputField
          label="Timing"
          mendetory
          id="timing"
          value={value}
          formName={formName}
        />
      </Grid>
      <Grid item md={12}>
        <ImageBlock
          id="imgUrl"
          onUpload={(imgUrl) => new FormModel(formName)._update({ imgUrl })}
          value={value}
          formName={formName}
        />
      </Grid>
    </Grid>
  );
};
