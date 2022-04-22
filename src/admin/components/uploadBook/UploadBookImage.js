import React from "react";
import { InputField } from "./../atoms/InputField";
import { Grid } from "@material-ui/core";
import { SelectField } from "./../atoms/SelectField";
import { useSelector } from "react-redux";
import ImageUpaloader from "../atoms/ImageUpaloader";
import { FormModel } from "./../../../model/FormModel";

export default ({ formName }) => {
  const { forms, models } = useSelector((state) => state);

  const commonProps = {
    formName,
    value: forms[formName],
  };

  return (
    <div style={{ width: "300px", height: "300px", margin: "0 80px" }}>
      <ImageUpaloader
        {...commonProps}
        id="imgUrl"
        onUpload={(imgUrl) => new FormModel(formName)._update({ imgUrl })}
      />
    </div>
  );
};
