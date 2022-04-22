import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableView from "../../components/atoms/TableView";
import { useSelector } from "react-redux";
import ActionCellRenderer from "../../components/dataGridComponents/ActionCellRenderer";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
import { showAlert } from "./../../../utils/showAlert";
import Navbar from "../../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { deleteStoreService, getAllStoreService } from "./../../services/store";
import AddStoreModal from "../../components/storeManagement/AddStoreModal";
import AddContentModal from "../../components/contentManagement/AddContentModal";
import BlockConfirmationModal from "../../components/atoms/BlockConfirmationModal";
import {
  deleteCMSService,
  getAllCMSDataService,
  publishOrBlockService,
} from "./../../services/cms";
import DisplayAdvanceEditorText from "../../components/atoms/DisplayAdvanceEditorText";

const useStyles = makeStyles(() => ({
  active: {
    background: "green",
    width: "10px",
    height: "10px",
    padding: "5px",
    margin: "auto 5px",
    borderRadius: "50%",
  },

  inActive: {
    background: "red",
    width: "10px",
    height: "10px",
    padding: "5px",
    margin: "auto 5px",
    borderRadius: "50%",
  },
}));

const headerData = [
  {
    headerName: "Title",
    field: "title",
    width: 200,
  },
  {
    headerName: "Subtitle",
    field: "subtitle",
    width: 200,
  },
  {
    headerName: "Description",
    field: "description",
    cellRenderer: "advanceText",
    width: 300,
  },
  {
    headerName: "URL",
    field: "link",
    width: 200,
  },
  {
    headerName: "Image",
    field: "image",
    width: 100,
  },
  {
    headerName: "Status",
    field: "approved",
    width: 100,
    cellRenderer: "statusField",
  },
  {
    headerName: "Action",
    field: "status",
    cellRenderer: "actionfield",
    width: 120,
  },
];

export default (props) => {
  useEffect(() => {
    getAllCMSDataService();
  }, []);

  const classes = useStyles();

  const [showAddModal, setShowAddModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [showBlockModal, setShowBlockModal] = useState();
  const [actionData, setActionData] = useState();
  const userAccess = useSelector((state) => state.forms.userAuth) || {};

  const tableData = useSelector((state) => state.models.cms) || [];

  const deleteContent = async () => {
    try {
      await deleteCMSService(actionData?.id);
      showAlert("Store deleted successfully.", "success");
      setActionData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  const blockContent = async () => {
    try {
      await publishOrBlockService(actionData?.id, !actionData?.approved);
      showAlert("Content status updated successfully.", "success");
      setActionData(null);
      setShowBlockModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  const frameworkComponents = {
    actionfield: (props) => (
      <ActionCellRenderer
        {...props}
        {...(userAccess?.deleteStore
          ? {
              onDelete: ({ data }) => {
                setActionData(data);
                setShowDeleteModal(true);
              },
            }
          : {})}
        {...(userAccess?.blockStore
          ? {
              onBlock: ({ data }) => {
                setActionData(data);
                setShowBlockModal(true);
              },
            }
          : {})}
        onShow={({ data }) => {
          setShowAddModal(true);
          setActionData(data);
        }}
        isBlocked={({ data }) => !data.approved}
      />
    ),
    statusField: ({ data }) => (
      <div style={{ display: "flex" }}>
        <div className={data.approved ? classes.active : classes.inActive} />
        <div>{data.approved ? "Active" : "Inactive"}</div>
      </div>
    ),
    advanceText: ({ data }) => (
      <DisplayAdvanceEditorText data={data.description} />
    ),
  };

  const actionPanel = (
    <>
      {userAccess?.addStore && (
        <Button
          onClick={() => {
            setShowAddModal(true);
          }}
          size="medium"
          variant="outlined"
          color="primary"
        >
          Add Content
        </Button>
      )}
    </>
  );

  return (
    <Navbar>
      <TableView
        headerDetails={headerData}
        tableData={tableData}
        actionPanel={actionPanel}
        header="Content Management"
        frameworkComponents={frameworkComponents}
      />
      {showAddModal && (
        <AddContentModal
          handleClose={() => setShowAddModal(false)}
          data={actionData}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Content."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteContent}
        />
      )}
      {showBlockModal && (
        <BlockConfirmationModal
          label="Are you sure? Block this Content."
          onClose={() => setShowBlockModal(false)}
          onConfirm={blockContent}
        />
      )}
    </Navbar>
  );
};
