import { Grid, Typography, TextField, Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import colors from "./colors";
import Select from "react-select";
import { FormModel } from "./../../../model/FormModel";

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "13px",
  },
  img: {
    width: "150px",
  },
  mendetory: {
    color: colors.red,
  },
  inputFieldGroup: {
    position: "relative",
  },
  suffix: {
    right: "10px",
    top: "5px",
    position: "absolute",
  },
}));

export const SelectField = ({
  label,
  placeholder,
  handleChange,
  id,
  mendetory,
  options = [],
  clearable = false,
  onInputChange = () => {},
  formName,
  error,
  value = {},
}) => {
  const classes = useStyles();

  return (
    <Grid container className="form-group">
      <Grid item xs={12}>
        <Typography className={classes.label} component="span">
          {label}
        </Typography>
        {mendetory && (
          <Typography
            className={classnames(classes.label, classes.mendetory)}
            component="span"
          >
            *
          </Typography>
        )}
      </Grid>
      <Grid className={classes.inputFieldGroup} item xs={12}>
        <Select
          onChange={(data) =>
            handleChange
              ? handleChange(data, id)
              : new FormModel(formName)._update({ [id]: data })
          }
          options={options}
          isClearable={clearable}
          placeholder={placeholder}
          onInputChange={(data) => onInputChange(data)}
          value={value[id] || ""}
        />
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Typography className={classes.errorText} component="span">
            {error}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
