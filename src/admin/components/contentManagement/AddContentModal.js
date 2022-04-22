import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { InputField } from "./../atoms/InputField";
import colors from "../atoms/colors";
import { makeStyles } from "@material-ui/core/styles";
import { showAlert } from "./../../../utils/showAlert";
import { FormModel } from "./../../../model/FormModel";
import { useSelector } from "react-redux";
import { addBlogApi } from "./../../services/blog";
import ImageBlock from "../atoms/ImageBlock";
import { addCMSService, editCMSService } from "../../services/cms";
import { ModalCross } from './../uploadBook/UploadBookModal';

const useStyles = makeStyles((theme) => ({
  Header: {
    fontWeight: "500",
    marginBottom: "30px",
    marginTop: "15px",
    fontSize: "18px",
    lineHeight: "23px",
    color: colors.blue,
    textAlign: "center",
  },
  confirmBtn: {
    width: "100%",
    textTransform: "capitalize",
    backgroundColor: colors.blue,
    marginBottom: "30px",
  },
  modalBox: {
    paddingTop: "10px",
    paddingBottom: "40px",
    borderRadius: "7px",
  },
  helperText: {
    marginBottom: "10px",
    marginTop: "10px",
    color: colors.disabled,
  },
  smFont: { fontSize: "13px" },
  img: {
    width: "100px",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "13px",
  },
  modal: {
    width: "100%",
  },
}));

export default ({ handleClose, data }) => {
  const classes = useStyles();
  const formName = "addContentForm";
  const [disableBtn, setDisableBtn] = useState();
  useEffect(() => {
    const {
      title = "",
      subtitle = "",
      link = "",
      description = "",
      image = "",
    } = data || {};
    new FormModel(formName)._createForm({
      title,
      subtitle,
      link,
      description,
      image,
    });
  }, []);

  const { forms } = useSelector((state) => state);
  const value = forms[formName] || {};

  const enableButton =
    value.title &&
    value.subtitle &&
    value.link &&
    value.description &&
    value.image;

  const addContent = async () => {
    const { title, subtitle, link, description, image } = value;
    try {
      setDisableBtn(true);
      const payload = {
        title,
        subtitle,
        link,
        description,
        image,
      };
      const resp = await addCMSService(payload);
      showAlert("Added content.", "success");
      handleClose();
    } catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setDisableBtn(false);
    }
  };

  const editContent = async () => {
    const { title, subtitle, link, description, image, id } = value;
    try {
      setDisableBtn(true);
      const payload = {
        id: data.id,
        title,
        subtitle,
        link,
        description,
        image,
        approved: true,
      };
      const resp = await editCMSService(payload);
      showAlert("Edited content.", "success");
      handleClose();
    } catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setDisableBtn(false);
    }
  };

  return (
    <Dialog
      className={classes.modalBox}
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      className="upalod-book-form"
      classes={{
        paper: classes.modal,
      }}
    >
      <ModalCross onClick={handleClose} />
      <DialogContent style={{ padding: "0px 100px" }}>
        <Typography className={classes.Header} component="p">
          {data ? "EDIT CONTENT" : "ADD CONTENT"}
        </Typography>
        <div>
          <InputField
            value={value}
            id="title"
            label="Add Title"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="subtitle"
            label="Add Subtitle"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="link"
            label="Add URL"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="description"
            label="Description"
            type="advance"
            formName={formName}
          />
          <Grid item md={12}>
            <ImageBlock
              id="image"
              onUpload={(image) => new FormModel(formName)._update({ image })}
              value={value}
              formName={formName}
              label="Add Image"
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={data ? editContent : addContent}
              color="primary"
              className={classes.confirmBtn}
              disabled={!enableButton || disableBtn}
            >
              {data ? "UPDATE" : "SAVE"}
            </Button>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};
