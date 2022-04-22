import React from "react";
import { InputField } from "./../atoms/InputField";
import { Grid } from "@material-ui/core";
import { SelectField } from "./../atoms/SelectField";
import { useSelector } from "react-redux";
import CreatableMultiSelect from "../atoms/CreatableMultiSelect";
import { convertFlatListToReactSelectionOption } from "./../../../utils/index";
import { PUBLISHING_RIGHTS, BOOK_FOR_AGE } from "./../../../constant/index";

export default ({ formName }) => {
  const { forms, models } = useSelector((state) => state);

  const commonProps = {
    formName,
    value: forms[formName],
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <SelectField
          label="Publishing Rights"
          id="pulishRight"
          mendetory
          {...commonProps}
          options={convertFlatListToReactSelectionOption(PUBLISHING_RIGHTS)}
        />
      </Grid>

      <Grid item md={6}>
        <SelectField
          options={convertFlatListToReactSelectionOption(BOOK_FOR_AGE)}
          label="Age Range"
          id="age"
          {...commonProps}
        />
      </Grid>
      <Grid item md={6}>
        <SelectField
          options={models.store || []}
          label="Store"
          id="storeId"
          {...commonProps}
        />
      </Grid>
      {/* <Grid item md={3}>
        <SelectField
          label="Grade Range"
          id="gradeRange"
          mendetory
          {...commonProps}
        />
      </Grid> */}
      {/* <Grid item md={6}>
        <SelectField
          label="Digital Rights Management (DRM)"
          id="drm"
          mendetory
          {...commonProps}
          इ
        />
      </Grid> */}
      <Grid item md={12}>
        <CreatableMultiSelect
          id="tag"
          label="Keywords (Tag)"
          mendetory
          {...commonProps}
          options={models.tag}
        />
      </Grid>
    </Grid>
  );
};
