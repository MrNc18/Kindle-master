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
import {
  blockStoreService,
  deleteStoreService,
  getAllStoreService,
} from "./../../services/store";
import AddStoreModal from "../../components/storeManagement/AddStoreModal";
import BlockConfirmationModal from "../../components/atoms/BlockConfirmationModal";

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
    headerName: "Check",

    checkboxSelection: true,
    width: 100,
  },
  {
    headerName: "Store Name",
    field: "name",
    width: 240,
  },
  {
    headerName: "Store Type",
    field: "type",
    width: 250,
  },
  {
    headerName: "Store Address ",
    field: "address",
    width: 300,
  },
  {
    headerName: "Status",
    field: "status",
    width: 150,
    cellRenderer: "statusField",
  },
  {
    headerName: "Action",
    cellRenderer: "actionfield",
    width: 120,
  },
];

export default () => {
  useEffect(() => {
    getAllStoreService();
  }, []);

  const history = useHistory();
  const classes = useStyles();

  const [showAddModal, setShowAddModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [deleteData, setDeleteData] = useState();
  const [showBlockModal, setShowBlockModal] = useState();
  const userAccess = useSelector((state) => state.forms.userAuth) || {};

  const tableData = useSelector((state) => state.models.store) || [];

  const deleteStore = async () => {
    try {
      await deleteStoreService(deleteData?.id);
      showAlert("Store deleted successfully.", "success");
      setDeleteData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  const blockContent = async () => {
    try {
      await blockStoreService(deleteData?.id, !deleteData?.approved);
      showAlert(
        `Store ${deleteData?.approved ? "Blocked" : "Unblocked"} successfully.`,
        "success"
      );
      setDeleteData(null);
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
                setDeleteData(data);
                setShowDeleteModal(true);
              },
            }
          : {})}
        {...(userAccess?.blockStore
          ? {
              onBlock: ({ data }) => {
                setDeleteData(data);
                setShowBlockModal(true);
              },
            }
          : {})}
        onShow={({ data }) =>
          history.push({
            pathname: `/admin/store-management/transaction/${data.id}`,
            state: data,
          })
        }
        isBlocked={({data}) => !data.approved}
      />
    ),
    statusField: ({ data }) => (
      <div style={{ display: "flex" }}>
        <div className={data.approved ? classes.active : classes.inActive} />
        <div>{data.approved ? "Active" : "Inactive"}</div>
      </div>
    ),
  };

  const actionPanel = (
    <>
      {userAccess?.addStore && (
        <Button
          onClick={() => setShowAddModal(true)}
          size="medium"
          variant="outlined"
          color="primary"
        >
          Add Store
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
        header="Store Management"
        frameworkComponents={frameworkComponents}
      />
      {showAddModal && (
        <AddStoreModal handleClose={() => setShowAddModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Event."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteStore}
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
