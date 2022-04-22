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
import { addBlogCategoryApi } from "../../services/blog";
import { addFQAService, editFQAService } from "../../services/cms";
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

export default ({ handleClose, data }) => {
  const classes = useStyles();
  const [question, setQuestion] = useState(data?.question || "");
  const [answer, setAnswer] = useState(data?.answer || "");
  const [disableBtn, setDisableBtn] = useState("");

  const value = {
    question,
    answer,
  };

  const addFAQ = async () => {
    try {
      setDisableBtn(true);
      await addFQAService({ question, answer });
      showAlert("Added FAQ.", "success");
      handleClose();
    } catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setDisableBtn(false);
    }
  };

  const editFAQ = async () => {
    try {
      setDisableBtn(true);
      await editFQAService({ question, answer, id: data.id });
      showAlert("Updated FAQ.", "success");
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
          {data.id ? "Edit" : "ADD"} Details
        </Typography>
        <div>
          <InputField
            value={value}
            id="question"
            handleChange={(event) => setQuestion(event.target.value)}
            label="Question"
            mendetory
          />
          <InputField
            value={value}
            id="answer"
            handleChange={(event) => setAnswer(event.target.value)}
            label="Answer"
            mendetory
            type="advance"
          />
          <Grid>
            <Button
              variant="contained"
              onClick={data.id ? editFAQ : addFAQ}
              color="primary"
              className={classes.confirmBtn}
              disabled={disableBtn || !answer || !question}
            >
              {data.id ? "Update" : "Save"}
            </Button>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};
