import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Box,
  ListItemText,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ProfilePanel from "./ProfilePanel";
import { dashboardSvg } from "./../../../svgs/dashboard";
import { peopleSvg } from "./../../../svgs/people";
import { store } from "./../../../svgs/store";
import { blogSvg } from "./../../../svgs/blog";
import { calendar } from "./../../../svgs/calendar";
import { tabLockSvg } from "./../../../svgs/tabLock";
import { useHistory } from "react-router-dom";
import { AUTH_TOKEN, deleteCookie } from "./../../../utils/cookie";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  smFont: { fontSize: "12px" },
  active: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  tabRoot: {
    minWidth: "34px",
  },
  signoutBtn: {
    width: "150px",
    fontSize: "12px",
    marginTop: "20px",
  },
  signout: {
    textAlign: "center",
    width: "100%",
  },
}));

const navList = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: dashboardSvg,
    accessKey: "dashboard",
  },
  {
    label: "Home",
    path: "/",
    icon: dashboardSvg,
    accessKey: "homeLink",
  },
  {
    label: "Book Management",
    path: "book-management",
    icon: dashboardSvg,
    accessKey: "bookManagement",
  },
  {
    label: "Order Management",
    path: "order-management",
    icon: calendar,
    accessKey: "orderManagement",
  },
  {
    label: "Customer Management",
    path: "customer-management",
    icon: peopleSvg,
    accessKey: "customerManagement",
  },
  {
    label: "Content Management",
    path: "content-management",
    icon: peopleSvg,
    accessKey: "cms",
  },
  {
    label: "FAQs",
    path: "faq",
    icon: peopleSvg,
    accessKey: "faq",
  },
  {
    label: "Stores Management",
    path: "store-management",
    icon: store,
    accessKey: "storeManagement",
  },
  {
    label: "Blogs/Article Management",
    path: "blog-management",
    icon: blogSvg,
    accessKey: "blogManagement",
  },
  {
    label: "Events Management",
    path: "events-management",
    icon: calendar,
    accessKey: "eventManagement",
  },
  {
    label: "Orders",
    path: "orders",
    icon: calendar,
    accessKey: "orders",
  },
  {
    label: "Change Password",
    path: "change-password",
    icon: tabLockSvg,
  },
];

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  const userAuth = useSelector((state) => state.forms.userAuth) || {};
  return (
    <Grid container open={true} onClose={() => {}}>
      <ProfilePanel userDetails={userDetails} />
      <Box role="presentation">
        <List>
          {navList.map(({ label, icon, path, accessKey }) => {
            if (accessKey && userAuth && !userAuth[accessKey]) {
              return null;
            }

            const isActive = history.location.pathname.split("/")[2] === path;
            return (
              <ListItem onClick={() => history.push(path)} key={label} button>
                <ListItemIcon
                  classes={{
                    root: classes.tabRoot,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: isActive ? classes.active : classes.smFont,
                  }}
                  primary={label}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Grid className={classes.signout}>
        <Button
          className={classes.signoutBtn}
          variant="contained"
          color="primary"
          onClick={() => {
            deleteCookie(AUTH_TOKEN);
            history.push(`/admin/login`);
          }}
        >
          Sign Out
        </Button>
      </Grid>
    </Grid>
  );
};
