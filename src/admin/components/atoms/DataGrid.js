import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./datagrid.css";

export const DataGrid = ({ headerDetails, tableData, frameworkComponents }) => {
  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    var gridWidth = document.getElementById("grid-wrapper")?.offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-alpine"
      id="grid-wrapper"
      style={{ height: "calc(100vh - 142px)", width: "100%" }}
    >
      <AgGridReact
        columnDefs={headerDetails}
        rowData={tableData}
        rowSelection="multiple"
        animateRows={true}
        style={{ height: "calc(100vh - 142px)", width: "100%" }}
        frameworkComponents={frameworkComponents}
        defaultColDef={{
          resizable: false,
          lockPosition: true,
        }}
        suppressDragLeaveHidesColumns={false}
        onFirstDataRendered={onFirstDataRendered}
        onGridSizeChanged={onGridSizeChanged}
      />
    </div>
  );
};

export default DataGrid;
