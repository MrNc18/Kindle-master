import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getTransactionDetails } from "./../../services/store";
import { Button, Grid, Typography } from "@material-ui/core";
import colors from "../../components/atoms/colors";
import { ratingSVG } from "./../../../svgs/ratingIcon";
import { locationSVG } from "./../../../svgs/loaction";
import { clockSCG } from "./../../../svgs/clockIcon";

const useStyles = makeStyles(() => ({
  conatiner: {
    margin: "10px",
    background: "#fff",
    boxShadow: "0px 1px 8px #3F3F4449",
    borderRadius: "4px",
    padding: "20px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  link: {
    fontSize: "14px",
    color: colors.blue,
    fontWeight: "bold",
  },
  smLabel: {
    fontSize: "14px",
    padding: "10px 0",
    color: colors.gray,
  },
  boldLabel: {
    fontSize: "14px",
    padding: "10px 0",
    fontWeight: "bold",
  },
  subLabel: {
    fontSize: "16px",
    padding: "10px 0",
    fontWeight: "bold",
  },
  icon: {
    marginRight: "10px",
  },
}));

export default () => {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [transactionDetails, setTransactionDetails] = useState({});

  const getData = async () => {
    const details = await getTransactionDetails(params.id);

    console.log(details);
    setTransactionDetails(details?.data?.[0]);
  };

  useEffect(() => {
    if (!params.id) {
      history.push("/store-management");
    }

    getData();
  }, []);

  const {
    store_name,
    store_timing,
    book_details,
    book_qty,
    from_first_name,
    from_last_name,
    received,
    store_address,
    store_description,
    store_description_en,
    store_type,
    to_first_name,
    to_last_name,
  } = transactionDetails;

  return (
    <Navbar>
      <Grid container className={classes.conatiner}>
        <Grid className={classes.label} item xs={12}>
          Store Transaction Details
        </Grid>
        <Grid item xs={5}>
          <img src="/images/book.png" />
        </Grid>
        <Grid item xs={7}>
          <Grid item xs={12}>
            <Typography component="div" className={classes.label}>
              {store_name}
            </Typography>
            <Typography className={classes.link}>Book Shop</Typography>
            <Typography className={classes.link}>{ratingSVG}</Typography>
            <Typography className={classes.smLabel}>
              <span>{locationSVG}</span> <span>{store_address}</span>
            </Typography>
            <Typography>
              <span className={classes.icon}>{clockSCG}</span>
              <span className={classes.link}>Timings</span>:{" "}
              <span className={classes.smLabel}>{store_address}</span>
            </Typography>
            <Typography>
              <span className={classes.boldLabel}>Number Of Books</span>:{" "}
              <span className={classes.link}>{book_qty}</span>
            </Typography>
            <Typography>
              <span className={classes.boldLabel}>Recieved By</span>:{" "}
              <span className={classes.link}>
                {to_first_name} {"  "} {to_last_name}
              </span>
            </Typography>
            <Typography>
              <span className={classes.boldLabel}>Deilvered By</span>:{" "}
              <span className={classes.link}>
                {from_first_name} {"  "} {from_last_name}
              </span>
            </Typography>
          </Grid>
          {store_description && (
            <Grid item xs={12}>
              <Typography className={classes.subLabel}>Description</Typography>
              <Typography className={classes.store_description}>
                {store_description}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Navbar>
  );
};
