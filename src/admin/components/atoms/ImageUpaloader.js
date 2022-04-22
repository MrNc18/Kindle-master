import { Grid, Typography, TextField, Box, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "./colors";
import { showAlert } from "./../../../utils/showAlert";
import { classnames } from "classnames";
import { useSelector } from "react-redux";

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
    textAlign: "center",
  },
  suffix: {
    right: "10px",
    top: "5px",
    position: "absolute",
  },
  fileInput: {
    opacity: 0,
    position: "absolute",
    cursor: "pointer",
    width: "60px",
    background: "transparent",
  },
}));

export default ({
  id,
  onUpload = () => {},
  label,
  mendetory,
  value = {},
  error,
  formName,
}) => {
  const { forms, models } = useSelector((state) => state);

  const commonProps = {
    formName,
    value: forms[formName] || {},
  };

  const classes = useStyles();

  const imageHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const { files } = event.target;
      const extension = files[0].type.split("/")[1];

      if (!["jpeg", "jpg", "png","pdf","gif"].includes(extension)) {
        showAlert("Attached file is not valid.", "error");
        onUpload("", "imgUrl");

        return;
      }

      if (files[0].size > 2000 * 1024) {
        alert("file should not greater then 800KB");
        onUpload("", "imgUrl");

        return;
      }
      let reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result, "imgUrl");
      };
      reader.readAsDataURL(files[0], "imgUrl");

      return;
    }

    onUpload("", "imgUrl");
  };

  const defaultIcon = () => {
    return (
      <img
        style={{ width: "100%", height: "100%", padding: "1px" }}
        src={"profilePics/defaultProfilePic.png"}
      />
    );
  };

  const renderImage = () => {
    return (
      <img src={value[id] || ""} style={{ width: "100%", height: "100%" }} />
    );
  };
  return (
    <Grid style={{ height: "100%" }} container className="form-group">
      {label && (
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
      )}
      <Grid className={classes.inputFieldGroup} item xs={12}>
        {value[id] ? renderImage() : defaultIcon()}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button variant="outlined" color="primary">
            <input
              type="file"
              className={classes.fileInput}
              onClick={imageHandler}
            />
            Upload
          </Button>
          {value[id] && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onUpload("", "imgUrl")}
              style={{ marginLeft: "10px" }}
            >
              Reset
            </Button>
          )}
        </div>
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
