import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ModalCross } from "./../../components/uploadBook/UploadBookModal";
import colors from "../../components/atoms/colors";
import { getOrderByIdService } from "../../services/orders";
import { baseurl } from "./../../../utils/request";
import { SHIPPING_TYPE } from "./../../../constant/index";

const useStyles = makeStyles(() => ({
  modalBox: {
    paddingTop: "10px",
    paddingBottom: "40px",
    borderRadius: "7px",
  },

  modalBody: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.blue,
    paddingTop: "10px",
  },

  btn: {
    width: "100px",
  },

  modalFooter: {
    justifyContent: "center",
    padding: "15px",
  },
}));

export default ({ actionData, onClose }) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getOrderByIdService(actionData.id);
      setData(response.data);

      console.log(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const billingAddress = [
    data?.billingdetails?.billing_firstname +
      " " +
      data?.billingdetails?.billing_lastname,
    data?.billingdetails?.billing_phone,
    data?.billingdetails?.billing_address,
    data?.billingdetails?.billing_address_optional,
    data?.billingdetails?.billing_companyName,
    data?.billingdetails?.billing_location,
  ].filter(Boolean);

  const shippingAddress = [
    data?.billingdetails?.shipping_firstname +
      data?.billingdetails?.shipping_phone,
    data?.billingdetails?.shipping_address,
    data?.billingdetails?.shipping_address_optional,
    data?.billingdetails?.shipping_companyName,
    data?.billingdetails?.shipping_location,
  ].filter(Boolean);

  const Content = () => {
    return (
      <Grid style={{ textAlign: "left" }} container>
        <Grid sm={4}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Order Id:{"  "}
          </span>{" "}
          #{data.order.id}
        </Grid>
        <Grid sm={4}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Order Date:{"  "}
          </span>
          {new Date(data.order.createdAt).toDateString()}
        </Grid>
        <Grid sm={4}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Order Status:{"  "}
          </span>{" "}
          {data.order.orderStatus}
        </Grid>
        <Grid sm={4}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Total Price:{"  "}
          </span>
          {data.order.total_price}
        </Grid>
        <Grid sm={4}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Shipping:{"  "}
          </span>
          {SHIPPING_TYPE[data.order.shipping || 0]}
        </Grid>
        <Grid sm={4}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Total Quantity:{"  "}
          </span>
          {data.order.quantity}
        </Grid>

        <Grid sm={12}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Bill Address:{"  "}
          </span>{" "}
          {billingAddress.join(", ")}
        </Grid>
        <Grid sm={12}>
          <span style={{ color: "#000", fontSize: "12px" }}>
            Shipping Address:{"  "}
          </span>{" "}
          {shippingAddress.length
            ? shippingAddress.join(", ")
            : billingAddress.join(", ")}
        </Grid>
        <Grid sm={12} style={{ marginTop: "30px" }}>
          <div className="col-md-12 table-responsive">
            <table className="book_info_tbl w-100" border="0">
              <tr className="header_row">
                <td>Product</td>
                <td>Price</td>
                <td>Qty</td>
                <td className="text-center">Subtotal</td>
              </tr>
              {data.orderDetails.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          className="cart_book_img"
                          style={{ width: "35px" }}
                          src={
                            item.cover_img
                              ? `${baseurl}/images/${item.cover_img}`
                              : "/images/book1.png"
                          }
                        />
                        <span className="cart_book_name">
                          {item.name || "Name here"}
                        </span>
                      </div>
                    </td>
                    <td className="cart_price text-center">{item.price}Kz</td>
                    <td className="cart_price text-center">{item.quantity}</td>
                    <td className="cart_price text-center">
                      {item.totalPrice}Kz
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Dialog
      className={classes.modalBox}
      open={true}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <ModalCross onClick={onClose} />
      <DialogContent className={classes.modalBody}>
        {loading ? "Loading...." : <Content />}
      </DialogContent>
    </Dialog>
  );
};
