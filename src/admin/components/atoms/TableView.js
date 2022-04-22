import { Grid } from "@material-ui/core";
import React from "react";
import DataGrid from "./DataGrid";
import colors from "../../components/atoms/colors";
import { makeStyles } from "@material-ui/core/styles";
import { SelectField } from './SelectField';

const useStyles = makeStyles(() => ({
  alignRight: {
    textAlign: "right",
  },
  chartPanel: {
    marginTop: "20px",
  },

  container: {
    background: colors.white,
    padding: "10px",
    boxShadow: "0px 1px 8px #3F3F4449",
    border: "4px",
    borderRadius: "4px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    paddingTop: "3px",
  },
}));

export default ({
  actionPanel,
  header,
  headerDetails,
  tableData,
  frameworkComponents,
  onSearch,
  selectProps,
  select
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container xs={12} className={classes.container}>
        <Grid className={classes.label} item xs={5}>
          {header}
        </Grid>
        <Grid item xs={3}>
          {select ? (
            <SelectField {...selectProps}/>
          ) : (
            <input
              className="form-control"
              placeholder="search"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          )}
        </Grid>
        <Grid className={classes.alignRight} item xs={4}>
          {actionPanel}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          headerDetails={headerDetails}
          tableData={tableData}
          frameworkComponents={frameworkComponents}
        />
      </Grid>
    </>
  );
};
