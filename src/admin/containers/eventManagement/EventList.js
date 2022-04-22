import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableView from "../../components/atoms/TableView";
import { useSelector } from "react-redux";
import ActionCellRenderer from "../../components/dataGridComponents/ActionCellRenderer";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
import { showAlert } from "./../../../utils/showAlert";
import {
  deleteEventService,
  getAllEventCategoryService,
  getAllEventService,
} from "./../../services/event";
import Navbar from "../../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import AddEvent from "../../components/eventManagement/AddEvent";
import DisplayAdvanceEditorText from "../../components/atoms/DisplayAdvanceEditorText";

const useStyles = makeStyles(() => ({
  marginRight: {
    marginRight: "10px",
  },
}));

const headerData = () => [
  {
    headerName: "Check",

    checkboxSelection: true,
    width: 50,
  },
  {
    headerName: "Category",
    field: "category_id",
    cellRenderer: "renderCategory",
    width: 100,
  },
  {
    headerName: "Event Name",
    field: "name",

    width: 100,
  },
  {
    headerName: "Date",
    field: "date",

    width: 100,
  },
  {
    headerName: "Time",
    field: "time",

    width: 100,
  },
  {
    headerName: "Description",
    field: "description",
    cellRenderer: "advanceText",
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
    getAllEventCategoryService();
    getAllEventService();
  }, []);

  const [showAddModal, setShowAddModal] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [deleteData, setDeleteData] = useState();
  const history = useHistory();
  const useAccess = useSelector((state) => state.forms.userAuth) || {};

  const { event: tableData = [], eventCategory = [] } = useSelector(
    (state) => state.models
  );

  const frameworkComponents = {
    actionfield: (props) => (
      <ActionCellRenderer
        {...props}
        {...(useAccess?.deleteEvent
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
      if (!data.category_id) return null;

      return <div>{data?.event_category?.name}</div>;
    },
    advanceText: ({ data }) => (
      <DisplayAdvanceEditorText data={data.description} />
    ),
  };

  const deleteBlog = async () => {
    try {
      await deleteEventService(deleteData?.id);
      showAlert("Event deleted successfully.", "success");
      setDeleteData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  const actionPanel = (
    <>
      {useAccess?.deleteEvent && (
        <Button
          className={classes.marginRight}
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => history.push("/admin/event-management/category")}
        >
          Manage Category
        </Button>
      )}
      {useAccess?.addEvent && (
        <Button
          onClick={() => setShowAddModal(true)}
          size="medium"
          variant="outlined"
          color="primary"
        >
          Add Event
        </Button>
      )}
    </>
  );

  return (
    <Navbar>
      <TableView
        headerDetails={headerData()}
        tableData={tableData}
        actionPanel={actionPanel}
        header="Event Management"
        frameworkComponents={frameworkComponents}
      />
      {showAddModal && (
        <AddEvent
          data={deleteData}
          handleClose={() => setShowAddModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Event."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteBlog}
        />
      )}
    </Navbar>
  );
};
