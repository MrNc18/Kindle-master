import React from "react";

export default ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};
