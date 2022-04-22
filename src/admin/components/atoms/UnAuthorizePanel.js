import React from "react";
import Navbar from "../header/Navbar";
import colors from "./colors";

export default () => {
  return (
    <Navbar>
      <div style={{ textAlign: "center", margin: "auto" }}>
        <div>
          <i
            style={{ color: colors.red, fontSize: "30px" }}
            className="fa fa-ban"
          ></i>
        </div>
        <div style={{ fontSize: "20px", marginTop: "20px" }}>
          <p>Opps! You are unauthorized to see this page.</p>
        </div>
      </div>
    </Navbar>
  );
};
