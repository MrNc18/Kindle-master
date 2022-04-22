import { Grid, Typography, TextField, Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import colors from "./colors";
import classNames from "classnames";

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

export const TextArea = ({
  label,
  placeholder,
  endAdornment,
  handleChange,
  id,
  mendetory,
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
        <textarea
          className="form-control"
          placeholder={placeholder || label}
          id={id}
          onChange={() => handleChange()}
        />
      </Grid>
    </Grid>
  );
};
