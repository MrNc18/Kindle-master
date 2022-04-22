import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import StepperPanel from "../atoms/StepperPanel";
import { makeStyles } from "@material-ui/core/styles";
import AddConsignee from "./AddConsignee";
import AddStoreForm from "./AddStoreForm";
import { FormModel } from "./../../../model/FormModel";
import { useSelector } from "react-redux";
import { addConsigneeService } from "./../../services/consignee";
import { showAlert } from "./../../../utils/showAlert";
import { addStoreService } from "../../services/store";
import { getAllStoreService } from "./../../services/store";
import { ModalCross } from './../uploadBook/UploadBookModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  modal: {
    height: "100%",
  },
  modalFooter: {
    justifyContent: "center",
    padding: "15px",
  },
}));

export default ({ handleClose }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [btnLoading, setBtnLoading] = useState();
  const styles = useStyles();
  const addConsigneeFormName = "addConsignee";
  const addStoreForm = "addStoreForm";

  useEffect(() => {
    new FormModel(addConsigneeFormName)._createForm({
      firstName: "",
      lastName: "",
      email: "",
      id: null,
    });
    new FormModel(addStoreForm)._createForm({
      storeName: "",
      storeType: "",
      storeAddress: "",
      timing: "",
    });
  }, []);

  const { forms, models } = useSelector((state) => state);
  const consigneeFormValues = forms[addConsigneeFormName] || {};
  const addStoreFormValue = forms[addStoreForm] || {};

  const addConsignee = async () => {
    try {
      setBtnLoading(true);
      const res = await addConsigneeService({
        first_name: consigneeFormValues.firstName,
        last_name: consigneeFormValues.lastName,
        email: consigneeFormValues.email,
      });
      new FormModel(addConsigneeFormName)._update({ id: res.data.data.id });
      setActiveStep(Math.min(activeStep + 1, 1));
    } catch (error) {
      showAlert(error.data.massage, "error");
    } finally {
      setBtnLoading(false);
    }
  };

  const addStore = async () => {
    const { storeName, storeType, storeAddress, timing } = addStoreFormValue;
    try {
      setBtnLoading(true);
      await addStoreService({
        name: storeName,
        type: storeType,
        address: storeAddress,
        userId: consigneeFormValues.id,
        timing,
      });
      showAlert("Store added successfully.", "success");
      handleClose();
      getAllStoreService();
    } catch (error) {
      showAlert(error.data.massage, "error");
    } finally {
      setBtnLoading(false);
    }
  };

  const nextButtonText = () => {
    if (activeStep == 0 && btnLoading) return "Adding Consignee....";
    if (activeStep == 0) return "Add Consignee";
    if (activeStep === 1 && btnLoading) return "Adding Store....";
    if (activeStep == 1) return "Add Store";
  };

  const disabledNextButtonText = () => {
    const { firstName, lastName, email } = consigneeFormValues;
    const { storeName, storeType, storeAddress, timing } = addStoreFormValue;
    if (activeStep == 0 && (btnLoading || !(firstName && lastName && email)))
      return true;

    if (
      activeStep == 1 &&
      (btnLoading || !(storeName && storeType && storeAddress && timing))
    )
      return true;
  };

  const nextStep = () => {
    if (activeStep === 1) {
      addStore();
      return;
    }

    if (consigneeFormValues.id) {
      setActiveStep(Math.min(activeStep + 1, 1));
    } else {
      addConsignee();
    }
  };

  const prevStep = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <AddConsignee
            value={consigneeFormValues}
            formName={addConsigneeFormName}
          />
        );

      case 1:
        return (
          <AddStoreForm value={addStoreFormValue} formName={addStoreForm} />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
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
          steps={[{ label: "Step 1" }, { label: "Step 2" }]}
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
          disabled={disabledNextButtonText()}
          variant="contained"
          onClick={nextStep}
          color="primary"
        >
          {nextButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
