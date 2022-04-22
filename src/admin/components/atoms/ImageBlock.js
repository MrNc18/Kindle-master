import { Grid, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
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
  imagePlace: {
    height: "100px",
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
  const [fileName, setFileName] = useState("");

  const classes = useStyles();

  const imageHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const { files } = event.target;
      const extension = files[0].type.split("/")[1];

      if (!["jpeg", "jpg", "png", "gif"].includes(extension)) {
        showAlert("Attached file is not valid.", "error");
        onUpload("", "imgUrl");

        return;
      }

      if (files[0].size > 800 * 1024) {
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
      <div
        style={{
          width: "100%",
          height: "100px",
          border: "2px dashed #ccc",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <div>Upload Image</div>
      </div>
    );
  };

  const renderImage = () => {
    return (
      <img src={value[id] || ""} style={{ width: "100%", height: "100px" }} />
    );
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
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            {value[id] ? renderImage() : defaultIcon()}
          </Grid>
          <Grid item xs={6} style={{ margin: "auto", textAlign: "center" }}>
            <Button variant="outlined" color="primary">
              <input
                type="file"
                className={classes.fileInput}
                onChange={imageHandler}
              />
              Upload
            </Button>
            {value[id] && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => onUpload("", "imgUrl")}
              >
                Reset
              </Button>
            )}
          </Grid>
        </Grid>
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
