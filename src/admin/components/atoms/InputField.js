import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import colors from "./colors";
import { FormModel } from "./../../../model/FormModel";
import AdvanceEditor from "./AdvanceEditor";
import moment from "moment";

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
  errorText: {
    fontSize: "10px",
    color: colors.red,
  },
}));

export const InputField = ({
  label,
  type = "text",
  placeholder,
  handleChange,
  id = "",
  mendetory,
  suffixIcon,
  value = {},
  formName,
  disabled = false,
}) => {
  const classes = useStyles();
  const [type1, setType1] = useState(type);

  const error = value?.validation?.[id];

  const input = () => {
    switch (type) {
      case "advance":
        return (
          <AdvanceEditor
            id={id}
            onChange={(data) =>
              handleChange
                ? handleChange({ target: { value: data } }, id)
                : new FormModel(formName)._update({ [id]: data })
            }
            value={value[id]}
          />
        );

      case "textarea":
        return (
          <textarea
            className="form-control"
            placeholder={placeholder || label}
            id={id}
            onChange={(e) =>
              handleChange
                ? handleChange(e, id)
                : new FormModel(formName)._update({ [id]: e.target.value })
            }
            value={value[id]}
          />
        );

      default:
        return (
          <input
            type={type1 || type}
            className="form-control"
            placeholder={placeholder || label}
            id={id}
            onChange={(e) =>
              handleChange
                ? handleChange(e, id)
                : new FormModel(formName)._update({ [id]: e.target.value })
            }
            value={value[id]}
            disabled={disabled}
            max={moment(new Date()).format("yyyy-MM-DD")}
          />
        );
    }
  };

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
        {input()}
        {suffixIcon && (
          <div
            onClick={() => {
              if (type == "password") {
                setType1(type1 == "password" ? "text" : "password");
              }
            }}
            className={classes.suffix}
          >
            {suffixIcon}
          </div>
        )}
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
