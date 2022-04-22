import React, { useState } from "react";
import Header from "./Header";
import { Grid } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../atoms/colors";

const useStyles = makeStyles({
  bodyContainer: {
    padding: "10px",
  },
  container: {
    background: colors.bgLight,
    height: "100vh",
  },
  sidebar: {
    background: colors.white,
  },
});

export default ({ children }) => {
  const classes = useStyles();
  const [sideBar, setSideBar] = useState(true);

  return (
    <Grid container className={classes.container}>
      {sideBar && (
        <Grid className={classes.sidebar} item xs={2}>
          <Sidebar />
        </Grid>
      )}
      <Grid item xs={sideBar ? 10 : 12}>
        <Header setSideBar={() => setSideBar(!sideBar)} />
        <Grid container className={classes.bodyContainer}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};
