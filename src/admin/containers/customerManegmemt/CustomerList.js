import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "../../components/atoms/TableView";
import { deleteBlogService } from "./../../services/blog";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ActionCellRenderer from "../../components/dataGridComponents/ActionCellRenderer";
import DeleteConfirmationModal from "../../components/atoms/DeleteConfirmationModal";
import { showAlert } from "./../../../utils/showAlert";
import {
  getAllUserService,
  deleteUserService,
} from "./../../services/customer";
import { ROLE_BY_ID } from "./../../../constant/index";
import { convertFlatListToReactSelectionOption } from "../../../utils";

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
    headerName: "Customer Name",
    field: "first_name",
    width: 150,
    cellRenderer: "renderName",
  },
  {
    headerName: "Customer ID",
    field: "id",
    width: 100,
  },
  {
    headerName: "Customer Type",
    field: "role",
    cellRenderer: "renderType",
    width: 100,
    filter: true,
  },
  {
    headerName: "Phone Number",
    field: "phone",
  },
  {
    headerName: "Email",
    field: "email",
  },
  {
    headerName: "Action",
    cellRenderer: "actionfield",
    width: 100,
  },
];

export default () => {
  const classes = useStyles();
  const [type, setType] = useState();

  useEffect(() => {
    getAllUserService();
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState();
  const [deleteData, setDeleteData] = useState();
  const history = useHistory();

  let tableData = useSelector((state) => state.models.customer) || [];

  const frameworkComponents = {
    actionfield: (props) => (
      <ActionCellRenderer
        {...props}
        onDelete={({ data }) => {
          setDeleteData(data);
          setShowDeleteModal(true);
        }}
        onShow={({ data }) =>
          history.push(`/admin/customer-management/${data.id}`)
        }
      />
    ),
    renderName: ({ data }) => data.first_name + " " + data.last_name,
    renderType: ({ data }) => ROLE_BY_ID[data.role] || null,
  };

  const deleteBlog = async () => {
    try {
      await deleteUserService(deleteData?.id);
      showAlert("Blog deleted successfully.", "success");
      setDeleteData(null);
      setShowDeleteModal(false);
    } catch (error) {
      showAlert(error.data.message, "error");
    }
  };

  if (type) {
    tableData = tableData.filter(
      (item) => item.role === ROLE_BY_ID.indexOf(type.value)
    );
  }

  return (
    <Navbar>
      <TableView
        headerDetails={headerData}
        tableData={tableData}
        header="Customer Management"
        frameworkComponents={frameworkComponents}
        select
        selectProps={{
          options: convertFlatListToReactSelectionOption(ROLE_BY_ID),
          handleChange: (data) => setType(data),
          value: { filter: type },
          id: "filter",
          clearable: true,
          placeholder: "Select Cutomer type",
        }}
      />

      {showDeleteModal && (
        <DeleteConfirmationModal
          label="Are you sure? Delete this Customer."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={deleteBlog}
        />
      )}
    </Navbar>
  );
};
