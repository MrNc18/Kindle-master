import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import PieChartView from "./../atoms/PieChartView";
import colors from "../atoms/colors";
import { ellipsis } from "./../../../svgs/ellipsis";
import { getLatestBook } from "../../services/book";
import moment from "moment";
import { baseurl } from "../../../utils/request";

const useStyles = makeStyles({
  subTitle: {
    fontSize: "11px",
  },
  title: {
    fontSize: "12px",
    fontWeight: "bold",
    color: colors.black,
  },
  header: {
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
  cardContainer: {
    justifyContent: "space-between",
    marginTop: "10px",
  },
  img: {
    width: "100%",
    objectFit: "contain",
  },
  marginAuto: {
    margin: "auto",
  },
});

export default () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await getLatestBook();
      setData(res.reverse());
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card>
      <CardContent className={classes.header}>
        Latest Books Updated ({data.length || 0})
      </CardContent>
      <CardContent>
        <Grid container>
          {data.map(({ name, createdAt, cover_img }) => {
            return (
              <Grid
                container
                spacing={2}
                className={classes.cardContainer}
                md={12}
              >
                <Grid md={2} item>
                  <img
                    className={classes.img}
                    src={
                      cover_img
                        ? `${baseurl}/images/${cover_img}`
                        : "/images/book1.png"
                    }
                  />
                </Grid>
                <Grid className={classes.marginAuto} md={9} item>
                  <Typography className={classes.title} gutterBottom>
                    {name}
                  </Typography>
                  <Typography className={classes.subTitle} gutterBottom>
                    {moment(createdAt).fromNow()}
                  </Typography>
                </Grid>

                <Grid className={classes.marginAuto} md={1} item>
                  {ellipsis}
                </Grid>
                <Grid className={classes.marginAuto} md={12} item>
                  <Divider light />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};
