import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import ActionCellRenderer from "../dataGridComponents/ActionCellRenderer";
import DisplayAdvanceEditorText from "./DisplayAdvanceEditorText";

export const AccordionView = ({
  label,
  description,
  id,
  actionPanel,
  onShow,
  onDelete,
}) => {
  const [active, setActive] = useState(false);
  return (
    <div className="accordion_box">
      <div
        data-toggle="collapse"
        data-parent="#accordion"
        id={`#collapse${id}`}
        style={cardHeader}
      >
        <Grid container>
          <Grid item sm={10}>
            <div className="card-title">{label}</div>
          </Grid>
          <Grid item sm={1}>
            {actionPanel}
          </Grid>
          <Grid style={actionrow} item sm={1}>
            <ActionCellRenderer
              onDelete={onDelete}
              onShow={onShow}
              onExpand={() => setActive(!active)}
            />
          </Grid>
        </Grid>
      </div>
      {active && (
        <div
          id={`collapse${id}`}
          className={!active ? "" : "collapsed"}
          data-parent="#accordion"
        >
          <div style={{ background: "#f1f1f1" }} className="card-body">
            <DisplayAdvanceEditorText data={description} />
          </div>
        </div>
      )}
    </div>
  );
};

const cardHeader = {
  backgrounColor: "#fff",
  border: "none",
  padding: "0.75rem 1.25rem",
  marginBottom: "0",
};

const actionrow = {
  paddingLeft: "10px",
};
