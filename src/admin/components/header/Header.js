import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { menuIcon } from "../../../svgs/menuIcon";
import colors from "../atoms/colors";
import classNames from "classnames";
import { bellIcon } from "../../../svgs/bellIcon";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    padding: 0,
    background: colors.header,
    boxShadow: "none",
    color: "#000",
  },
  menubtn: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bold: {
    fontWeight: "bold",
    paddingLeft: "10px",
  },
  activeTxt: {
    color: colors.blue,
    fontWeight: "bold",
  },
}));

export default ({ setSideBar }) => {
  const classes = useStyles();
  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  const { first_name, last_name } = userDetails;
  const full_name = `${first_name} ${last_name}`;

  return (
    <AppBar className={classes.headerRoot} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menubtn}
          color="inherit"
          aria-label="menu"
          onClick={() => setSideBar(true)}
        >
          {menuIcon}
        </IconButton>
        <Typography className={classes.activeTxt} variant="span">
          Welcome,
        </Typography>
        <Typography
          variant="span"
          className={classNames(classes.title, classes.bold)}
        >
          {full_name}
        </Typography>
        <IconButton
          edge="start"
          className={classes.menubtn}
          color="inherit"
          aria-label="menu"
        >
          {bellIcon}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
