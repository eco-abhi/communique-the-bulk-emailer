import * as React from "react";

import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";

import "./DataTable.css";

import {
  createDictFromRow,
  createColumnProperties,
} from "./DataTableUtils.jsx";

function DataTable() {
  const fileUploadResponse = useSelector((state) => state.fileUploadResponse);

  const dataset = fileUploadResponse[0].data.dataset.data;
  const dataCols = fileUploadResponse[0].data.dataset.columns;
  const numericCols = fileUploadResponse[0].data["numeric-cols"];
  const stringCols = fileUploadResponse[0].data["string-cols"];
  const [globalFilter, setGlobalFilter] = useState("");

  let colProperties = createColumnProperties(numericCols, stringCols);

  const data = [];
  for (const row of dataset) {
    const dataDict = createDictFromRow(dataCols, row);
    data.push(dataDict);
  }

  const columns = useMemo(() => colProperties, []);

  return (
    <div id="dataTable">
      <MaterialReactTable
        columns={columns}
        data={data}
        enableGrouping
        enableGlobalFilter={true}
        onGlobalFilterChange={setGlobalFilter}
        enableStickyHeader
        initialState={{
          density: "spacious",
          expanded: true, //expand all groups by default
          grouping: [], //an array of columns to group by by default (can be multiple)
          pagination: { pageIndex: 0, pageSize: 50 },
          sorting: [{ id: stringCols[0], desc: false }], //sort by state by default
          showGlobalFilter: true,
        }}
        state={{
          globalFilter,
        }}
        muiToolbarAlertBannerChipProps={{
          color: "primary",
        }}
        muiTableContainerProps={{ sx: { maxHeight: 700 } }}
        muiTableBodyCellProps={{
          sx: {
            color: "#EBECF3", // Change the font color to white
            fontSize: "12px",
          },
        }}
        muiToolbarAlertBannerProps={{
          sx: {
            color: "white",
            backgroundColor: "#7d1921",
          },
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "0",
            border: "0.5px solid white",
          },
        }}
        muiTableHeadCellProps={{
          //simple styling with the `sx` prop, works just like a style prop in this example
          sx: {
            fontWeight: "7d1921",
            fontSize: "12px",
            color: "white",
            backgroundColor: "black",
          },
          className: "custom-table-header",
        }}
        muiTopToolbarProps={{
          sx: {
            backgroundColor: "#7d1921",
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            backgroundColor: "black",
          },
        }}
        muiTablePaginationProps={{
          sx: {
            color: "white",
          },
        }}
        muiSelectCheckboxProps={{
          sx: {
            backgroundColor: "red",
          },
        }}
        muiSearchTextFieldProps={{
          sx: { backgroundColor: "grey", color: "white" },
        }}
        muiTableHeadCellFilterSliderProps={{
          sx: { backgroundColor: "black", color: "red" },
        }}
        muiTableHeadCellFilterTextFieldProps={{
          sx: {
            backgroundColor: "white",
            marginTop: "1rem",
            marginBottom: "1rem",
          },
        }}
        muiTableBodyRowProps={{
          hover: false,
          sx: {
            "&.MuiTableRow-hover": {
              "&:hover": {
                backgroundColor: "transparent !important",
              },
            },
          },
        }}
        muiTableBodyProps={{
          elevation: 0,
          sx: {
            "& tr:nth-of-type(odd)": {
              backgroundColor: "#052939",
            },
            "& tr:nth-of-type(even)": {
              backgroundColor: "#080808",
            },
          },
        }}
      />
    </div>
  );
}

export default DataTable;
