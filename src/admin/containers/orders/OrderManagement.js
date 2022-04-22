import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableView from "../../components/atoms/TableView";
import { useSelector } from "react-redux";
import { showAlert } from "./../../../utils/showAlert";
import Navbar from "../../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  getAllOrderService,
  updateOrderService,
} from "./../../services/orders";
import moment from "moment";
import OrderDetailsModal from "./OrderDetailsModal";
import { ORDER_STATUS } from "../../../constant";

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
    headerName: "Order ID",
    field: "id",
    width: 100,
  },
  {
    headerName: "Order Date",
    field: "createdAt",
    width: 240,
    cellRenderer: "dateField",
  },
  {
    headerName: "Order By",
    field: "userId",
    width: 250,
    cellRenderer: "orderBy",
  },
  {
    headerName: "Total Quantity",
    field: "quantity",
    width: 50,
  },
  {
    headerName: "Total Price",
    field: "total_price",
    width: 150,
  },
  {
    headerName: "Store",
    field: "storeId",
    width: 150,
    cellRenderer: "store",
  },
  {
    headerName: "Action",
    cellRenderer: "actionfield",
    width: 150,
  },
];

export default () => {
  useEffect(() => {
    getAllOrderService();
  }, []);

  const history = useHistory();
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [actionData, setActionData] = useState();
  const [btnLoading, setBtnLoading] = useState(false);

  const tableData = useSelector((state) => state.models.order) || [];

  const confirmOrder = ({ id }) => {
    try {
      setBtnLoading(true);
      const response = updateOrderService({
        orderId: id,
        orderstatus: ORDER_STATUS.confirmed,
      });

      showAlert("Order Confirmed.", "success");
    } catch (error) {
    } finally {
      setBtnLoading(false);
    }
  };

  const frameworkComponents = {
    actionfield: (props) => (
      <>
        <Button
          style={{ marginRight: "5px" }}
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => {
            setActionData(props.data);
            setShowDetails(true);
          }}
        >
          View
        </Button>
        {ORDER_STATUS.confirmed !== props?.data?.orderStatus && (
          <Button
            onClick={() => {
              confirmOrder(props.data);
            }}
            color="primary"
            variant="contained"
            size="small"
            disabled={btnLoading}
          >
            {btnLoading ? "Confiming..." : "Confirm"}
          </Button>
        )}
        {ORDER_STATUS.confirmed === props?.data?.orderStatus && (
          <Button color="primary" variant="contained" size="small" disabled>
            Confirmed
          </Button>
        )}
      </>
    ),
    dateField: ({ data }) => {
      return <>{moment(data.createdAt).fromNow()}</>;
    },
    orderBy: ({ data }) => (
      <>
        {data?.orderdetails?.[0]?.billingdetails?.billing_firstname +
          " " +
          data?.orderdetails?.[0]?.billingdetails?.billing_lastname}
      </>
    ),
    store: ({ data }) => <> {data?.store?.name} </>,
  };

  return (
    <Navbar>
      <TableView
        headerDetails={headerData}
        tableData={tableData}
        header="Store Management"
        frameworkComponents={frameworkComponents}
      />
      {showDetails && (
        <OrderDetailsModal
          actionData={actionData}
          onClose={() => {
            setActionData();
            setShowDetails(false);
          }}
        />
      )}
    </Navbar>
  );
};
