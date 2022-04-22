import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { InputField } from "./../atoms/InputField";
import colors from "../atoms/colors";
import { eye } from "./../../../svgs/eye";
import { makeStyles } from "@material-ui/core/styles";
import { showAlert } from "./../../../utils/showAlert";
import { addEventCategoryService } from "./../../services/event";
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

export default ({ handleClose }) => {
  const classes = useStyles();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [disableBtn, setDisableBtn] = useState();

  const value = {
    name,
    desc,
  };

  const addCategory = async () => {
    try {
      setDisableBtn(true);
      const resp = await addEventCategoryService(name, desc);
      showAlert("Added blog category.", "success");
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
          ADD CATEGORY
        </Typography>
        <div>
          <InputField
            value={value}
            id="name"
            handleChange={(event) => setName(event.target.value)}
            label="Category Name"
            mendetory
          />
          <InputField
            value={value}
            id="desc"
            handleChange={(event) => setDesc(event.target.value)}
            label="Description"
            mendetory
            type="advance"
          />
          <Grid>
            <Button
              variant="contained"
              onClick={addCategory}
              color="primary"
              className={classes.confirmBtn}
              disabled={disableBtn || !name || !desc}
            >
              Add Category
            </Button>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};
