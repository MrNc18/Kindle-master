import React from "react";
import { InputField } from "./../atoms/InputField";
import { Grid, Select } from "@material-ui/core";
import { SelectField } from "./../atoms/SelectField";
import { useSelector } from "react-redux";
import { convertFlatListToReactSelectionOption } from "./../../../utils/index";
import {
  BOOK_CONDITION,
  BOOK_SIZE,
  BOOK_TYPE,
} from "./../../../constant/index";
import { FormModel } from "./../../../model/FormModel";

export default ({ formName, editData = {} }) => {
  const { forms, models } = useSelector((state) => state);

  const commonProps = {
    formName,
    value: forms[formName],
  };

  React.useEffect(() => {
    const category =
      (models.bookCategory || []).find(
        (ins) => ins.value == editData.category_id
      ) || {};

    new FormModel(formName)._update({ category });
  }, [models.bookCategory]);

  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <InputField id="name" label="Book Name" mendetory {...commonProps} />
      </Grid>
      <Grid item md={6}>
        <SelectField
          label="Category"
          mendetory
          {...commonProps}
          id="category"
          options={models.bookCategory || []}
        />
      </Grid>
      <Grid item md={6}>
        <SelectField
          label="Price Type"
          mendetory
          {...commonProps}
          id="priceType"
          options={convertFlatListToReactSelectionOption(BOOK_TYPE)}
        />
      </Grid>
      <Grid item md={6}>
        <SelectField
          label="Item Condition"
          mendetory
          {...commonProps}
          id="itemCondition"
          options={convertFlatListToReactSelectionOption(BOOK_CONDITION)}
        />
      </Grid>
      <Grid item md={4}>
        <InputField
          label="Publication"
          mendetory
          {...commonProps}
          id="publication"
        />
      </Grid>
      <Grid item md={4}>
        <SelectField
          label="Author"
          {...commonProps}
          id="author"
          options={models.author}
          mendetory
        />
      </Grid>
      <Grid item md={4}>
        <SelectField
          label="Book Size"
          options={convertFlatListToReactSelectionOption(BOOK_SIZE)}
          mendetory
          {...commonProps}
          id="size"
        />
      </Grid>
      <Grid item md={4}>
        <InputField
          type="number"
          label="Kz(Price)"
          mendetory
          {...commonProps}
          id="price"
        />
      </Grid>
      <Grid item md={4}>
        <InputField label="Edition(Year)" {...commonProps} id="edition" />
      </Grid>
      <Grid item md={4}>
        <InputField label="No of Pages" {...commonProps} id="pages" />
      </Grid>
    </Grid>
  );
};
