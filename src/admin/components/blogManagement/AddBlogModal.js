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
import { SelectField } from "./../atoms/SelectField";
import { FormModel } from "./../../../model/FormModel";
import { useSelector } from "react-redux";
import { addBlogApi, editBlogApi } from "./../../services/blog";
import ImageBlock from "../atoms/ImageBlock";
import { baseurl } from "./../../../utils/request";
import moment from "moment";
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

export default ({ handleClose, data = {} }) => {
  const classes = useStyles();
  const formName = "addBlogForm";
  const [disableBtn, setDisableBtn] = useState();
  const { forms, models } = useSelector((state) => state);
  const category = models.blogCategory || [];

  useEffect(() => {
    new FormModel(formName)._createForm({
      category: category.find((item) => data.category_id == item.id) || {},
      title: data.title || "",
      url: data.url || "",
      date: data.date ? moment(data.date).format("yyyy-MM-DD") : "",
      description: data.description || "",
      image: "",
      time: data.time || "",
    });
  }, []);

  let value = forms[formName] || {};
  if (data.image) {
    value = {
      ...value,
      image: value.image || `${baseurl}/images/${data.image}`,
    };
  }

  const enableButton =
    value.category?.id &&
    value.title &&
    value.url &&
    value.date &&
    value.image &&
    value.time;

  const addBlog = async () => {
    const { title, category, url, date, time, description, image } = value;
    try {
      setDisableBtn(true);
      const data = {
        title,
        url,
        date,
        time,
        description,
        image,
        category_id: category?.value,
      };
      const resp = await addBlogApi(data);
      showAlert("Added blog.", "success");
      handleClose();
    } catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setDisableBtn(false);
    }
  };

  const editBlog = async () => {
    try {
      setDisableBtn(true);
      const payload = {
        id: data.id,
        title: value.title,
        category_id: value?.category?.value,
        url: value.url,
        date: value.date,
        description: value.description,
        image: value.image,
        time: value.time,
      };
      await editBlogApi(payload);
      showAlert("Updated blog.", "success");
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
          {data?.id ? "EDIT" : "ADD"} BLOG
        </Typography>
        <div>
          <SelectField
            label="Select category"
            mendetory
            options={category || []}
            id="category"
            formName={formName}
            value={value}
          />
          <InputField
            value={value}
            id="title"
            label="Add Title"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="url"
            label="Add URL"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="date"
            label="Select Date"
            mendetory
            type="date"
            formName={formName}
          />
          <InputField
            value={value}
            id="time"
            label="Select Time"
            mendetory
            type="time"
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
              onClick={data.id ? editBlog : addBlog}
              color="primary"
              className={classes.confirmBtn}
              disabled={!enableButton || disableBtn}
            >
              {data?.id ? "Edit" : "Add"} Blog
            </Button>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};
