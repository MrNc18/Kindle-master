import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "../../components/atoms/TableView";
import AddCategoryModal from "../../components/bookCategory/AddCategoryModal";
import { useSelector } from "react-redux";
import ActionCellRenderer from "../../components/dataGridComponents/ActionCellRenderer";
import { showAlert } from "../../../utils/showAlert";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
import {
  getAllBookCategoryService,
  deleteBookCategoryService,
} from "./../../services/book";
import DisplayAdvanceEditorText from "../../components/atoms/DisplayAdvanceEditorText";

const useStyles = makeStyles(() => ({
  marginRight: {
    marginRight: "10px",
  },
}));

const headerData = [
  {
    headerName: "Check",
    checkboxSelection: true,
    width: 50,
  },
  {
    headerName: "Category Name",
    field: "name",
    width: 200
  },
  {
    headerName: "Description",
    field: "description",
    cellRenderer: "advanceText",
  },
  {
    headerName: "Action",
    cellRenderer: "actionfield",
    width: 50,
  },
];

export default () => {
  const classes = useStyles();

  const [showModal, setShowModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [deleteData, setDeleteData] = useState();

  const tableData = (
    useSelector((state) => state.models.bookCategory) || []
  ).filter(({ status }) => status);

  useEffect(() => {
    getAllBookCategoryService();
  }, []);

  const actionPanel = (
    <>
      <Button
        className={classes.marginRight}
        variant="outlined"
        color="primary"
        size="medium"
        onClick={() => setShowModal(true)}
      >
        Add Book Category
      </Button>
    </>
  );

  const deleteBookCategory = async () => {
    try {
      await deleteBookCategoryService(deleteData?.id);
      showAlert("Book category deleted successfully.", "success");
      setDeleteData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  const frameworkComponents = {
    actionfield: (props) => (
      <ActionCellRenderer
        {...props}
        onDelete={({ data }) => {
          setDeleteData(data);
          setShowDeleteModal(true);
        }}
      />
    ),
    advanceText: ({ data }) => (
      <DisplayAdvanceEditorText data={data.description} />
    ),
  };

  return (
    <Navbar>
      <TableView
        headerDetails={headerData}
        tableData={tableData || []}
        actionPanel={actionPanel}
        header="Manage Category"
        frameworkComponents={frameworkComponents}
      />
      {showModal && (
        <AddCategoryModal handleClose={() => setShowModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Blog Category."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteBookCategory}
        />
      )}
    </Navbar>
  );
};
