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
import ImageBlock from "../atoms/ImageBlock";
import moment from "moment";
import {
  convertFlatListToReactSelectionOption,
  convertOptionForValue,
} from "../../../utils";
import { GENDER } from "../../../constant";
import {
  getUserDetailsByToken,
  updateUser,
} from "../../services/authentication";
import { isOnlyTextValid } from "../../../utils/validators";
import { baseurl } from "./../../../utils/request";
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

export default ({ handleClose }) => {
  const classes = useStyles();
  const formName = "editUserForm";
  const [disableBtn, setDisableBtn] = useState();

  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  // userDetails.dob_date = moment(userDetails.dob_date).format("yyyy-MM-DD");
  console.log(userDetails);

  useEffect(() => {
    new FormModel(formName)._createForm({
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      dob_date: moment(userDetails.dob_date).format("yyyy-MM-DD"),
      gendar: userDetails?.gendar
        ? convertOptionForValue(userDetails.gendar)
        : {},
      city: userDetails.city,
      phone: userDetails.phone,
      email: userDetails.email,
      profile_img: "",
    });
  }, []);

  const { forms } = useSelector((state) => state);
  let value = forms[formName] || {};
  if (userDetails.profile_img) {
    value = {
      ...value,
      profile_img:
        value.profile_img || `${baseurl}/images/${userDetails.profile_img}`,
    };
  }

  const enableButton =
    value.first_name &&
    value.last_name &&
    value.dob_date &&
    value?.gendar?.value &&
    value.phone;

  const editUser = async () => {
    // const { title, category, url, date, time, description, image } = value;
    if (!isOnlyTextValid(value.city)) {
      showAlert("City name not valid", "error");
      return;
    }
    try {
      setDisableBtn(true);
      const data = {
        first_name: value.first_name,
        last_name: value.last_name,
        dob_date: value.dob_date,
        gendar: value?.gendar?.value,
        city: value.city,
        phone: value.phone,
        email: value.email,
        image:
          value.profile_img == `${baseurl}/images/${userDetails.profile_img}`
            ? ""
            : value.profile_img,
      };
      const resp = await updateUser(data);
      showAlert("Updated user.", "success");
      getUserDetailsByToken();
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
          Update Info
        </Typography>
        <div>
          <InputField
            value={value}
            id="first_name"
            label="First Name"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="last_name"
            label="Last Name"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="dob_date"
            label="Select Birthday"
            mendetory
            type="date"
            formName={formName}
          />
          <SelectField
            label="Select gender"
            mendetory
            options={convertFlatListToReactSelectionOption(GENDER)}
            id="gendar"
            formName={formName}
            value={value}
          />
          <InputField
            value={value}
            id="city"
            label="City"
            formName={formName}
          />

          <InputField
            value={value}
            id="phone"
            label="Phone"
            mendetory
            formName={formName}
          />
          <InputField
            value={value}
            id="email"
            label="Email"
            type="email"
            formName={formName}
            disabled={true}
          />
          <Grid item md={12}>
            <ImageBlock
              id="profile_img"
              onUpload={(image) =>
                new FormModel(formName)._update({ profile_img: image })
              }
              value={value}
              formName={formName}
              label="Image"
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={editUser}
              color="primary"
              className={classes.confirmBtn}
              disabled={!enableButton || disableBtn}
            >
              {disableBtn ? "Updating..." : "Update"}
            </Button>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};
