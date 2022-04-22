import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
// import { getOrder } from "./../admin/services/orders";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from "../admin/components/header/Navbar";
import { getOrderByUserIdService } from "../admin/services/orders";
import OrderDetailsModal from "../admin/containers/orders/OrderDetailsModal";

// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { ItemList } from "./../components/ItemList";
// import { InputField } from "./../admin/components/atoms/InputField";
// import { showAlert } from "./../utils/showAlert";
// import { cancelOrder } from "../admin/services/orders";

export const Orders = () => {
  const [data, setData] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [cancelModal, showCancelModal] = useState(false);

  //   const cancelYourOrder = async (cancelReason, setDisabledButton) => {
  //     try {
  //       setDisabledButton(true);
  //       const response = await cancelOrder({
  //         id: orderDetails.id,
  //         cancel_reason: cancelReason,
  //       });
  //       showAlert("Order successfully cancelled.", "success");
  //       setData(
  //         [
  //           ...data.filter((item) => item.id !== orderDetails.id),
  //           response.data,
  //         ].sort((a, b) => b.id - a.id)
  //       );
  //       setOrderDetails();
  //       showCancelModal();
  //     } catch (error) {
  //       showAlert(
  //         "Failed while cancelling the order. Please try again!!.",
  //         "error"
  //       );
  //     } finally {
  //       setDisabledButton(false);
  //     }
  //   };

  const getData = async () => {
    const { data } = await getOrderByUserIdService();
    setData(data.sort((a, b) => b.id - a.id));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Navbar>
      {showDetailsModal && (
        <OrderDetailsModal
          onClose={() => {
            setOrderDetails();
            setShowDetailsModal();
          }}
          actionData={orderDetails}
        />
      )}
      {/* {cancelModal && (
        <OrderCancelModal
          onClose={() => {
            setOrderDetails();
            showCancelModal();
          }}
          onCancel={cancelYourOrder}
          orderDetails={orderDetails}
        />
      )} */}

      <Grid spacing={3} container>
        {data.map((item) => (
          <Grid key={item.id} md={3} sm={4} xs={12} item>
            <OrderCard
              onShowDetails={() => {
                setOrderDetails(item);
                setShowDetailsModal(true);
              }}
              onCancel={(details) => {
                setOrderDetails(item);
                showCancelModal(true);
              }}
              order={item}
            />
          </Grid>
        ))}
      </Grid>
    </Navbar>
  );
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  text: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  bigFont: {
    fontSize: "18px",
    fontWeight: "600",
  },
});

export const OrderCard = ({ order, onShowDetails, onCancel }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid xs={6} item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              component="span"
            >
              Order ID:
            </Typography>
            <Typography
              color="textSecondary"
              className={classes.bigFont}
              gutterBottom
              component="strong"
            >
              {" "}
              #{order.id}
            </Typography>
          </Grid>
          <Grid style={{ textAlign: "right" }} xs={6} item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              component="span"
              style={{ lineHeight: "2.3" }}
            >
              {order.createdAt ? new Date().toDateString() : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12} item>
            <Typography
              className={classes.text}
              color="textSecondary"
              gutterBottom
              component="span"
            >
              Thanks, You have ordered{" "}
              <b style={{ fontSize: "16px" }}>{order?.quantity || 0}</b> item(s)
              ! We will deliver the order and collect{" "}
              <b style={{ fontSize: "16px" }}>
                {order.total_price || order?.price}Kz.
              </b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions style={{ justifyContent: "right" }}>
        {!order.is_cancelled ? (
          <Button
            onClick={onCancel}
            variant={"outlined"}
            color="secondary"
            size="small"
            style={{ fontSize: "10px", padding: "5px" }}
          >
            Cancel Order
          </Button>
        ) : (
          <Button
            onClick={onCancel}
            variant={"outlined"}
            color="secondary"
            size="small"
            disabled
            style={{ fontSize: "10px", padding: "5px" }}
          >
            Order Cancelled
          </Button>
        )}
        <Button
          onClick={onShowDetails}
          variant={"outlined"}
          color="primary"
          size="small"
          style={{ fontSize: "10px", padding: "5px" }}
        >
          Order Details
        </Button>
      </CardActions>
    </Card>
  );
};
