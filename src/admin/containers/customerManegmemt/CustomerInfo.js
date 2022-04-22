import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../components/atoms/colors";
import PersonIcon from "@material-ui/icons/Person";
import CakeIcon from "@material-ui/icons/Cake";
import WcIcon from "@material-ui/icons/Wc";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import DraftsIcon from "@material-ui/icons/Drafts";
import PostAddIcon from "@material-ui/icons/PostAdd";
import BookIcon from "@material-ui/icons/Book";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
  },
  alignRight: {
    textAlign: "right",
  },
  chartPanel: {
    marginTop: "10px",
  },

  container: {
    background: colors.white,
    padding: "10px",
    border: "4px",
    borderRadius: "4px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    paddingTop: "3px",
  },
}));

export default (props) => {
  const {
    email,
    first_name,
    gendar,
    id,
    last_name,
    phone,
    role,
  } = props.useDetails;
  const classes = useStyles();
  console.log(props);
  return (
    <>
      <Grid container xs={12} className={classes.container}>
        <Grid className={classes.label} item xs={12} md={6}>
          Personal Details
          <TableContainer className={classes.chartPanel}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <PersonIcon color="primary" /> Name
                  </TableCell>
                  <TableCell align="right">{`${first_name} ${last_name}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <CakeIcon color="primary" /> Birthday
                  </TableCell>
                  <TableCell align="right">31/10/1995</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <WcIcon color="primary" /> Gender
                  </TableCell>
                  <TableCell align="right">{gendar || "Male"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <LocationCityIcon color="primary" /> City
                  </TableCell>
                  <TableCell align="right">Los Angeles, California</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <PhoneAndroidIcon color="primary" /> Mobile Number
                  </TableCell>
                  <TableCell align="right">
                    {phone || "+1213-951-343-9290"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <DraftsIcon color="primary" /> Mail Address
                  </TableCell>
                  <TableCell align="right">{email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid className={classes.label} item xs={12} md={6}>
          Statistics
          <TableContainer className={classes.chartPanel}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <PostAddIcon color="primary" /> Post
                  </TableCell>
                  <TableCell align="right">18</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <BookIcon color="primary" /> Blogs
                  </TableCell>
                  <TableCell align="right">31/10/1995</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
