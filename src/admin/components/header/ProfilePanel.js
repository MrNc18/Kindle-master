import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import colors from "../atoms/colors";
import { makeStyles } from "@material-ui/core/styles";
import { ROLE_BY_ID } from "./../../../constant/index";
import EditUserModal from "../userManagement/EditUserModal";

const useStyles = makeStyles((theme) => ({
  container: {
    background: colors.blue,
    boxShadow: "none",
    color: colors.white,
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  img: {
    height: "65px",
    width: "60px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  name: {
    fontWeight: "bold",
    fontSize: "12px",
  },
  role: {
    fontSize: "11px",
  },
  profilePic: {
    position: "relative",
  },
  editPic: {
    position: "absolute",
    right: 0,
    width: "18px",
    cursor: "pointer"
  }
}));

export default ({ userDetails }) => {
  const classes = useStyles();
  const { first_name, last_name, role } = userDetails;
  const [showEditUserModal, setShowEditUserModal] = useState();
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.profilePic}>
      <img className={classes.editPic} src="/images/edit.png" onClick={() => setShowEditUserModal(true)}/>
        <img className={classes.img} src="/images/author-12.jpg" />
      </Grid>
      <Grid item>
        <Typography className={classes.name} component="div">
          {first_name} {"  "} {last_name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.role} component="div">
          {ROLE_BY_ID[Number(role)]}
        </Typography>
      </Grid>
      {showEditUserModal && <EditUserModal handleClose={() => setShowEditUserModal(false)} />}
    </Grid>
  );
};
