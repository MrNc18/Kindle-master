import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../components/header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import DashboardTile from "../components/dashboard/DashboardTile";
import BooksoldChart from "../components/dashboard/BooksoldChart";
import CustomerTabs from "../components/dashboard/CustomerTabs";
import LatestBook from "../components/dashboard/LatestBook";
import UploadBookModal from "./../components/uploadBook/UploadBookModal";
import { useParams, useHistory } from "react-router-dom";
import ChangePassword from "../components/ChangePassword";
import { useSelector } from "react-redux";
import {
  getAllOrderService,
  getOrderByAuthorIdService,
} from "./../services/orders";
import moment from "moment";

const useStyles = makeStyles(() => ({
  alignRight: {
    textAlign: "right",
    marginBottom: "20px",
  },
  chartPanel: {
    marginTop: "20px",
  },
  marginRight: {
    marginRight: "10px",
  },
}));

export default ({ showChangePasswordModal }) => {
  const classes = useStyles();

  const [uploadBook, setUploadBook] = React.useState();
  const [showChangePassword, setShowChangePassword] = React.useState(
    showChangePasswordModal
  );
  const params = useParams();
  const history = useHistory();
  const useAccess = useSelector((state) => state.forms.userAuth) || {};
  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  const [value, onChange] = useState([new Date(), new Date()]);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    getOrderData(value);
  }, [userDetails]);

  const getOrderData = async (time = value) => {
    let prom = "";
    switch (userDetails.role) {
      case 1:
      case 2:
        prom = getAllOrderService;
        break;

      case 3:
        prom = "";
        break;

      case 4:
        prom = getOrderByAuthorIdService;
        break;

      default:
        break;
    }

    if (prom) {
      let payload = {};
      if (time) {
        payload = {
          fromdate: moment(time[0]).format("YYYY-MM-DD"),
          todate: moment(time[1]).format("YYYY-MM-DD"),
        };
      }
      const response = await prom(payload);

      const erning = response.data.reduce(
        (data, item) => {
          data.earning = data.earning + item.total_price;

          return data;
        },
        { earning: 0, orders: response.data.length }
      );

      setOrderDetails(erning);
    }
  };

  return (
    <Navbar>
      <Grid item md={12} className={classNames(classes.alignRight)}>
        {useAccess?.addBook && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setUploadBook(true)}
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
            Upload Book Category
          </Button>
        )}
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <DashboardTile
              {...{
                lable: "Order Summary",
                orderDetails,
                value: "Kz 20,200",
                info: "Since last months",
                onChange: (data) => {
                  getOrderData(data);
                  onChange(data);
                },
                dateValue: value,
              }}
            />
          </Grid>
          <Grid item md={6}>
            <LatestBook />
            {/* <CustomerTabs /> */}
          </Grid>
        </Grid>
        {/* <Grid spacing={2} container md={12} className={classes.chartPanel}>
          <Grid item md={4}>
            
          </Grid>
          <Grid item md={8}>
            <BooksoldChart />
          </Grid>
        </Grid> */}
      </Grid>
      {uploadBook && (
        <UploadBookModal handleClose={() => setUploadBook(false)} />
      )}

      {showChangePassword && (
        <ChangePassword handleClose={() => setShowChangePassword(false)} />
      )}
    </Navbar>
  );
};
