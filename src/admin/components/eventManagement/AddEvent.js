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
import { addEventService } from "../../services/event";
import ImageBlock from "../atoms/ImageBlock";
import { editEventService } from "./../../services/event";
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
}));

export default ({ handleClose, data = {} }) => {
  const classes = useStyles();
  const formName = "addEventForm";
  const [disableBtn, setDisableBtn] = useState();
  const { forms, models } = useSelector((state) => state);
  const eventCategory = models.eventCategory;

  useEffect(() => {
    new FormModel(formName)._createForm({
      category: eventCategory.find((item) => data.category_id == item.id) || {},
      name: data.name || "",
      date: data.date ? moment(data.date).format("yyyy-MM-DD") : "",
      description: data.description || "",
      address: data.address || "",
      image: "",
      time: data.time || "",
    });
  }, []);

  let value = forms[formName] || {};
  if (data.image) {
    value = {
      ...value,
      imgUrl: value.image || `${baseurl}/images/${data.image}`,
    };
  }

  const addEvent = async () => {
    try {
      setDisableBtn(true);
      const data = {
        name: value.name,
        category_id: value?.category?.value,
        date: value.date,
        description: value.description,
        address: value.address,
        image: value.imgUrl,
        time: value.time,
      };
      const resp = await addEventService(data);
      showAlert("Added event.", "success");
      handleClose();
    } catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setDisableBtn(false);
    }
  };

  const editEvent = async () => {
    try {
      setDisableBtn(true);
      const payload = {
        id: data.id,
        name: value.name,
        category_id: value?.category?.value,
        date: value.date,
        description: value.description,
        address: value.address,
        image: value.imgUrl,
        time: value.time,
      };
      await editEventService(payload);
      showAlert("Updated event.", "success");
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
    >
    <ModalCross onClick={handleClose} />
      <DialogContent>
        <Typography className={classes.Header} component="p">
          {data?.id ? "EDIT" : "ADD"} EVENT
        </Typography>
        <div>
          <SelectField
            label="Select category"
            mendetory
            options={eventCategory || []}
            id="category"
            formName={formName}
            value={value}
          />
          <InputField
            value={value}
            id="name"
            label="Event Name"
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
          <InputField
            value={value}
            id="address"
            label="Address"
            formName={formName}
          />
          <Grid item md={12}>
            <ImageBlock
              id="imgUrl"
              onUpload={(imgUrl) => new FormModel(formName)._update({ imgUrl })}
              value={value}
              formName={formName}
              label="Select Image"
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={data.id ? editEvent : addEvent}
              color="primary"
              className={classes.confirmBtn}
              disabled={disableBtn}
            >
              {data?.id ? "Edit" : "Add"} Event
            </Button>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};
