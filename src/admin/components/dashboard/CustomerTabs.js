import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import PieChartView from "./../atoms/PieChartView";
import colors from "../atoms/colors";

const useStyles = makeStyles({
  subTitle: {
    fontSize: "11px",
  },
  title: {
    fontSize: "14px",
    fontWeight: "bold",
    color: colors.black,
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

export default () => {
  const classes = useStyles();
  return (
    <Card>
      <CardActions className={classes.footer}>
        <Typography className={classes.title} gutterBottom>
          Customers
        </Typography>
        <Typography className={classes.title} gutterBottom>
          Vendors
        </Typography>
      </CardActions>
      <CardContent style={{ padding: "20px" }}>
        <Grid style={{ height: "100%" }} container>
          {[
            { lable: "Today", value: "251", subLabel: "Registered Customer" },
          ].map(({ lable, value, subLabel }) => {
            return (
              <Grid style={{ height: "100%" }} spacing={4} md={12} container>
                <Grid style={{ paddingRight: 0 }} item md={6}>
                  <div className="col-md-12 table-responsive">
                    <table className="book_info_tbl w-100" border="0">
                      <tr className="header_row">
                        <td>Cutomer Type</td>
                        <td>Count</td>
                      </tr>
                      {[
                        { type: "Admin", count: "10" },
                        { type: "Author", count: "17" },
                        { type: "Consignee", count: "20" },
                        { type: "Buyer", count: "10" },
                      ].map((item) => {
                        return (
                          <tr key={item.type}>
                            <td>{item.type}</td>
                            <td className="cart_price text-center">
                              {item.count}
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </Grid>
                <Grid style={{ paddingRight: 0 }} item md={6}>
                  <PieChartView
                    innerRadius={30}
                    outerRadius={40}
                    circleSize={80}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};
