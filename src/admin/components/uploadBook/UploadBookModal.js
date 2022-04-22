import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import StepperPanel from "../atoms/StepperPanel";
import BookDetailsInput from "./BookDetailsInput";
import { makeStyles } from "@material-ui/core/styles";
import MoreBookDetails from "./MoreBookDetails";
import BookUploaderDetails from "./BookUploaderDetails";
import {
  getAllBookCategoryService,
  addBookService,
  getAllTags,
} from "./../../services/book";
import { FormModel } from "./../../../model/FormModel";
import { useSelector } from "react-redux";
import UploadBookImage from "./UploadBookImage";
import { enableButton, createPayloadForAddBook, getInitialData } from "./utils";
import { showAlert } from "./../../../utils/showAlert";
import { getAllAuthorService } from "./../../services/author";
import { getAllStoreService } from "./../../services/store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalCross = ({ onClick }) => (
  <div onClick={onClick} className="modal-cross">
    x
  </div>
);

const useStyles = makeStyles((theme) => ({
  modal: {
    height: "100%",
  },
  modalFooter: {
    justifyContent: "center",
    padding: "15px",
  },
}));

export default ({ handleClose, editData }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const styles = useStyles();
  const formName = "addBookForm";
  const value = useSelector((state) => state.forms[formName]);
  const { first_name, last_name, email, city, phone } =
    useSelector((state) => state.forms.userDetails) || {};
  const { author = [], bookCategory = [] } = useSelector(
    (state) => state.models
  );

  useEffect(() => {
    getAllBookCategoryService();
    getAllTags();
    getAllAuthorService();
    getAllStoreService();
    new FormModel(formName)._createForm({
      category: {},
      tag: [],
      publisherName: first_name + " " + last_name,
      number: phone,
      email,
      city,
    });
    return () => new FormModel(formName)._createForm({});
  }, []);

  useEffect(() => {
    if (author.length && bookCategory.length && editData) {
      const initialData = getInitialData(editData, author, bookCategory);
      new FormModel(formName)._createForm({
        ...initialData,
        publisherName: first_name + " " + last_name,
        number: phone,
        email,
        city,
      });
    }
  }, [author, bookCategory]);

  const addBook = async () => {
    const payload = createPayloadForAddBook(value);
    try {
      await addBookService(payload);
      showAlert("Book Added Successfully!", "success");
      handleClose();
    } catch (error) {
      showAlert(error.massage, "errorइ");
    }
  };

  const nextStep = () => {
    if (activeStep === 3) {
      addBook();
      return;
    }
    setActiveStep(Math.min(activeStep + 1, 4));
  };

  const prevStep = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <BookDetailsInput formName={formName} editData={editData} />;

      case 1:
        return <MoreBookDetails formName={formName} editData={editData} />;

      case 2:
        return <BookUploaderDetails formName={formName} editData={editData} />;

      default:
        return <UploadBookImage formName={formName} editData={editData} />;
    }
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className="upalod-book-form"
      classes={{
        paper: styles.modal,
      }}
    >
      <ModalCross onClick={handleClose} />

      <DialogTitle id="alert-dialog-slide-title">
        <StepperPanel
          activeStep={activeStep}
          steps={[
            { label: "Step 1" },
            { label: "Step 2" },
            { label: "Step 3" },
            { label: "Step 4" },
          ]}
        />
      </DialogTitle>
      <DialogContent>{renderStep()}</DialogContent>
      <DialogActions className={styles.modalFooter}>
        {!!activeStep && (
          <Button variant="contained" onClick={prevStep} color="primary">
            Back
          </Button>
        )}
        <Button
          disabled={!enableButton(value, activeStep)}
          variant="contained"
          onClick={nextStep}
          color="primary"
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};
