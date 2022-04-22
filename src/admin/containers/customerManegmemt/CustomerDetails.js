import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { getUserByIdService } from "../../services/customer";
import { showAlert } from "./../../../utils/showAlert";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../../components/atoms/colors";
import UserPost from "../../components/customerManagement/UserPost";
import CustomerInfo from "./CustomerInfo";

const useStyles = makeStyles(() => ({
  marginRight: {
    marginRight: "10px",
  },
  coverImg: {
    height: "200px",
    width: "100%",
    background: Colors.gray,
  },
  root: {
    flexGrow: 1,
  },
  headerRootPrimary: {
    padding: 0,
    background: Colors.white,
    boxShadow: "none",
    color: "#000",
    position: "relative",
  },
  headerRootSecondary: {
    padding: 0,
    background: Colors.blue,
    boxShadow: "none",
    color: "#000",
  },
  link: {
    height: "62px",
    borderRadius: 0,
    color: Colors.white,
    fontWeight: "bold",
    padding: "22px",
    cursor: "pointer",
  },
  img: {
    height: "70px",
    width: "70px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  imgContainer: {
    position: "absolute",
    top: "-15px",
  },
  nameGrid: {
    marginLeft: "75px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
  },
}));

export default ({ history, match }) => {
  const classes = useStyles();
  const [useDetails, setUserDetails] = useState({});
  const [step, setStep] = useState(0);

  const getData = async () => {
    try {
      const id = match.params.id;
      const details = await getUserByIdService(Number(id));
      setUserDetails(details?.data?.[0]);
    } catch (error) {
      showAlert(error.data?.massage, "error");
    }
  };
  useEffect(() => {
    const id = match.params.id;
    if (!id) {
      history.push("/admin/customer-management");
      return;
    }

    getData();
  }, []);
  return (
    <Navbar>
      <Grid item className={classes.coverImg} xs={12} />
      <Grid style={{ display: "flex" }} item xs={12}>
        <Grid item xs={3}>
          <AppBar className={classes.headerRootPrimary} position="static">
            <Toolbar>
              <Grid item className={classes.imgContainer}>
                <img className={classes.img} src="/images/author-12.jpg" />
              </Grid>
              <Grid className={classes.nameGrid}>
                <Typography className={classes.name}>
                  {useDetails.first_name} {"  "} {useDetails.last_name}
                </Typography>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={9}>
          <AppBar className={classes.headerRootSecondary} position="static">
            <Toolbar>
              <div
                style={step === 0 ? { borderBottom: "5px solid #fff" } : {}}
                className={classes.link}
                color="inherit"
                onClick={() => setStep(0)}
              >
                INFO
              </div>
              <div
                style={step === 1 ? { borderBottom: "5px solid #fff" } : {}}
                className={classes.link}
                color="inherit"
                onClick={() => setStep(1)}
              >
                POST
              </div>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      <Grid style={{ padding: "20px", background: "#fff" }} item xs={12}>
        {step ? <UserPost /> : <CustomerInfo useDetails={useDetails} />}
      </Grid>
    </Navbar>
  );
};
