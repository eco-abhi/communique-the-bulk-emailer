import { Box } from "@mui/material";

export function createDictFromRow(columns, dataRow) {
  const dataDict = {};
  for (let i = 0; i < columns.length; i++) {
    dataDict[columns[i]] = dataRow[i];
  }
  return dataDict;
}

export function createColumnProperties(numericCols, stringCols) {
  const localeStringOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const aggregatedCols = numericCols.map((colName) => ({
    header: colName,
    accessorKey: colName,
    aggregationFn: ["count", "mean", "median", "min", "max", "sum"],
    AggregatedCell: ({ cell }) => (
      <>
        Count:{" "}
        <Box
          sx={{
            color: "#ffe8d6",
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {cell.getValue()?.[0]}
        </Box>
        Average:{" "}
        <Box
          sx={{
            color: "#ffe8d6",
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {cell.getValue()?.[1]?.toLocaleString?.("en-US", localeStringOptions)}
        </Box>
        Median:{" "}
        <Box
          sx={{
            color: "#ffe8d6",
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {cell.getValue()?.[2]?.toLocaleString?.("en-US", localeStringOptions)}
        </Box>
        Min:{" "}
        <Box
          sx={{
            color: "#ffe8d6",
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {cell.getValue()?.[3]?.toLocaleString?.("en-US", localeStringOptions)}
        </Box>
        Max:{" "}
        <Box
          sx={{
            color: "#ffe8d6",
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {cell.getValue()?.[4]?.toLocaleString?.("en-US", localeStringOptions)}
        </Box>
        Sum:{" "}
        <Box
          sx={{
            color: "#ffe8d6",
            fontWeight: "bold",
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {cell.getValue()?.[5]?.toLocaleString?.("en-US", localeStringOptions)}
        </Box>
      </>
    ),
    Cell: ({ cell }) => <>{cell.getValue()}</>,
  }));

  const stringColsConfig = stringCols.map((colName, idx) => ({
    header: colName,
    accessorKey: colName,
    Cell: ({ cell }) => <>{cell.getValue()}</>,
  }));

  return [...stringColsConfig, ...aggregatedCols];
}
