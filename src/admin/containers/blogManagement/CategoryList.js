import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "../../components/atoms/TableView";
import {
  getAllBlogCategory,
  getAllBlogs,
  deleteBlogCategoryService,
} from "./../../services/blog";
import AddCategoryModal from "../../components/blogManagement/AddCategoryModal";
import { useSelector } from "react-redux";
import ActionCellRenderer from "./../../components/dataGridComponents/ActionCellRenderer";
import { showAlert } from "./../../../utils/showAlert";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
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
    width: 50
  },
  {
    headerName: "Category Name",
    field: "name",
    width: 100
    
  },
  {
    headerName: "Description",
    field: "description",
    cellRenderer: "advanceText",
    
  },
  {
    headerName: "Action",
    cellRenderer: "actionfield",
    width: 100
  },
];

export default () => {
  const classes = useStyles();


  const [showModal, setShowModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [deleteData, setDeleteData] = useState();

  const tableData = (
    useSelector((state) => state.models.blogCategory) || []
  ).filter(({ status }) => status);

  useEffect(() => {
    getAllBlogCategory();
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
        Add Category
      </Button>
    </>
  );

  const deleteBlogCategory = async () => {
    try {
      await deleteBlogCategoryService(deleteData?.id);
      showAlert("Blog category deleted successfully.", "success");
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
          onConfirm={deleteBlogCategory}
        />
      )}
    </Navbar>
  );
};
