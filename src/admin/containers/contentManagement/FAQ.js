import React, { useEffect, useState } from "react";
import {
  getAllFAQService,
  approveFAQService,
  deleteFAQService,
} from "./../../services/cms";
import { useSelector } from "react-redux";
import { AccordionView } from "./../../components/atoms/AccordionView";
import Navbar from "../../components/header/Navbar";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../components/atoms/colors";
import AddFAQModal from "../../components/contentManagement/AddFAQModal";
import { showAlert } from "./../../../utils/showAlert";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";

const useStyles = makeStyles(() => ({
  container: {
    background: colors.white,
    padding: "10px",
    boxShadow: "0px 1px 8px #3F3F4449",
    border: "4px",
    borderRadius: "4px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    paddingTop: "3px",
  },
  alignRight: {
    textAlign: "right",
  },
}));

export const FAQList = ({ history, onSearch }) => {
  const classes = useStyles();
  const [showAddModel, setShowAddModal] = useState(false);
  const [actionData, setActionData] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getAllFAQService();
  }, []);

  const data = useSelector((state) => state.models.faq) || [];

  const deleteQuestion = async () => {
    try {
      await deleteFAQService(actionData?.id);
      showAlert("Question deleted successfully.", "success");
      setActionData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };
  const actionPanel = (
    <Button
      onClick={() => setShowAddModal(true)}
      size="medium"
      variant="outlined"
      color="primary"
    >
      Add FAQ
    </Button>
  );

  return (
    <Navbar>
      <Grid container xs={12} className={classes.container}>
        <Grid className={classes.label} item xs={5}>
          FAQ Management
        </Grid>
        <Grid item xs={3}>
          <input
            className="form-control"
            placeholder="search"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </Grid>
        <Grid className={classes.alignRight} item xs={4}>
          {actionPanel}
        </Grid>
      </Grid>
      <Grid container xs={12} className={classes.container}>
        <section
          style={{ padding: 0, background: "#fffF" }}
          className="container-fluid services"
        >
          <div className="container">
            <div id="accordion" className="accordion">
              <div className="card mb-0">
                {data.map((item) => {
                  const { id, question, answer, approved } = item;
                  return (
                    <AccordionView
                      label={question}
                      description={answer}
                      id={id}
                      onShow={() => {
                        setActionData(item);
                        setShowAddModal(true);
                      }}
                      onDelete={() => {
                        setActionData(item);
                        setShowDeleteModal(true);
                      }}
                      actionPanel={
                        <div>
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            disabled={approved}
                            onClick={() => approveFAQService(id)}
                          >
                            {approved ? "Approved" : " Approve"}
                          </Button>
                        </div>
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Grid>
      {showAddModel && (
        <AddFAQModal
          data={actionData}
          handleClose={() => setShowAddModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Question."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteQuestion}
        />
      )}
    </Navbar>
  );
};
