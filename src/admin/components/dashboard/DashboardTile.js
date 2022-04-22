import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  value: {
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
  footer: {
    background: "#EFEFEF",
  },
});

export default ({ lable, value, info, onChange, dateValue, orderDetails }) => {
  const classes = useStyles();

  return (
    <div className="MuiPaper-elevation1">
      <div>
        <Grid style={{ padding: "5px" }} container className={classes.footer}>
          <Grid item md={4}>
            <Typography gutterBottom className="makeStyles-title-30">
              {lable}
            </Typography>
          </Grid>
          <Grid item md={8}>
            <DateTimeRangePicker
              format="y-MM-dd"
              onChange={onChange}
              value={dateValue}
            />
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          style={{ padding: "10px", background: "#fff", height: "265px" }}
        >
          <Grid container>
            <Grid item md={6}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Total Earning
              </Typography>
              <Typography className={classes.value} variant="h6" component="h6">
                {orderDetails.earning}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Todal Orders
              </Typography>
              <Typography className={classes.value} variant="h6" component="h6">
                {orderDetails.orders}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
