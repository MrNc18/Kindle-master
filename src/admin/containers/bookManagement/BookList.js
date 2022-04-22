import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "../../components/atoms/TableView";
import { useSelector } from "react-redux";
import ActionCellRenderer from "../../components/dataGridComponents/ActionCellRenderer";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
import { showAlert } from "./../../../utils/showAlert";
import {
  getBookListByUser,
  deleteBookService,
  getBookByStoreId,
} from "./../../services/book";
import UploadBookModal from "../../components/uploadBook/UploadBookModal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  marginRight: {
    marginRight: "10px",
  },
}));

const headerData = [
  {
    headerName: "Check",
    checkboxSelection: true,
    width: 60,
  },
  {
    headerName: "Book ID",
    field: "id",
    width: 100,
  },
  {
    headerName: "Book Name",
    field: "name",
    width: 250,
  },
  {
    headerName: "Price",
    field: "price",
    width: 100,
  },
  {
    headerName: "Publication",
    field: "publication",
  },
  {
    headerName: "Edition",
    field: "edition_year",
  },
  {
    headerName: "Action",
    cellRenderer: "actionfield",
    width: 100,
  },
];

export default ({ storeId }) => {
  const classes = useStyles();
  useEffect(() => {
    if (storeId) {
      getBookByStoreId(storeId);
    } else {
      getBookListByUser();
    }
  }, []);
  const useAccess = useSelector((state) => state.forms.userAuth) || {};

  const [showDeleteModal, setShowDeleteModal] = useState();
  const [uploadBook, setUploadBook] = React.useState();
  const [actionData, setActionData] = useState();
  const history = useHistory();

  const tableData = useSelector((state) => state.models.book) || [];

  const frameworkComponents = {
    actionfield: (props) => (
      <ActionCellRenderer
        {...props}
        onDelete={({ data }) => {
          setActionData(data);
          setShowDeleteModal(true);
        }}
        onShow={({ data }) => {
          setActionData(data);
          setUploadBook(true);
        }}
      />
    ),
  };

  const deleteBook = async () => {
    try {
      await deleteBookService(actionData?.id);
      showAlert("Book deleted successfully.", "success");
      setActionData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  const actionPanel = () => (
    <>
      {useAccess?.addBook && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setActionData();
            setUploadBook(true);
          }}
          className={classes.marginRight}
        >
          Upload Book
        </Button>
      )}
      {useAccess?.manageBookCategory && (
        <Button
          variant="contained"
          color="primary"
          variant="outlined"
          onClick={() => history.push("/admin/dashboard/category")}
        >
          Add Book Category
        </Button>
      )}
    </>
  );

  return (
    <>
      {uploadBook && (
        <UploadBookModal
          editData={actionData}
          handleClose={() => setUploadBook(false)}
        />
      )}
      <TableView
        headerDetails={headerData}
        tableData={tableData}
        header="Book Management"
        frameworkComponents={frameworkComponents}
        actionPanel={actionPanel()}
      />

      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Book."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteBook}
        />
      )}
    </>
  );
};
