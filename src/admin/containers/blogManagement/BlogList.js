import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "../../components/atoms/TableView";
import {
  getAllBlogs,
  deleteBlogService,
  getAllBlogCategory,
} from "./../../services/blog";
import { useHistory } from "react-router-dom";
import AddBlogModal from "../../components/blogManagement/AddBlogModal";
import { useSelector } from "react-redux";
import ActionCellRenderer from "../../components/dataGridComponents/ActionCellRenderer";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
import { showAlert } from "./../../../utils/showAlert";
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
    width: 100,
  },
  {
    headerName: "Category",
    field: "category_id",
    width: 100,
    cellRenderer: "renderCategory",
  },
  {
    headerName: "Title",
    field: "title",
    width: 150,
  },
  {
    headerName: "Description",
    field: "description",
    cellRenderer: "advanceText",
  },
  {
    headerName: "Link",
    field: "url",
    width: 100,

    width: 100,
  },
  {
    headerName: "Total Link",

    width: 100,
  },
  {
    headerName: "Yes",

    width: 100,
  },
  {
    headerName: "No",

    width: 100,
  },
  {
    headerName: "Action",
    cellRenderer: "actionfield",
    width: 100,
  },
];

export default () => {
  const classes = useStyles();
  useEffect(() => {
    getAllBlogs();
    getAllBlogCategory();
  }, []);

  const [showAddModal, setShowAddModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [deleteData, setDeleteData] = useState();
  const history = useHistory();
  const useAccess = useSelector((state) => state.forms.userAuth) || {};

  let { blog: tableData = [] } = useSelector((state) => state.models);
  tableData = tableData.filter(({ status }) => status);

  const frameworkComponents = {
    actionfield: (props) => (
      <ActionCellRenderer
        {...props}
        {...(useAccess?.deleteBlog
          ? {
              onDelete: ({ data }) => {
                setDeleteData(data);
                setShowDeleteModal(true);
              },
            }
          : {})}
        onShow={({ data }) => {
          setDeleteData(data);
          setShowAddModal(true);
        }}
      />
    ),
    renderCategory: ({ data }) => {
      return <div>{data?.blog_category?.name || null}</div>;
    },
    advanceText: ({ data }) => (
      <DisplayAdvanceEditorText data={data.description} />
    ),
  };

  const deleteBlog = async () => {
    try {
      await deleteBlogService(deleteData?.id);
      showAlert("Blog deleted successfully.", "success");
      setDeleteData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  const actionPanel = (
    <>
      {useAccess?.manageEventCategory && (
        <Button
          className={classes.marginRight}
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => history.push("/admin/blog-management/category")}
        >
          Manage Category
        </Button>
      )}
      {useAccess?.addBlog && (
        <Button
          onClick={() => setShowAddModal(true)}
          size="medium"
          variant="outlined"
          color="primary"
        >
          Add Blog
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
        header="Blogs/Article Management"
        frameworkComponents={frameworkComponents}
      />
      {showAddModal && (
        <AddBlogModal data={deleteData} handleClose={() => setShowAddModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Blog."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteBlog}
        />
      )}
    </Navbar>
  );
};
