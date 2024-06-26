"use client";
import { House, LocalFireDepartment, Radio } from "@mui/icons-material";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  TablePagination,
  styled,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import { useState } from "react";

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Page() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterAlert, setFilterAlert] = useState("");
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function createData(
    id: number,
    alert: string,
    alertName: string,
    address: string,
    recorded: string,
    type: string
  ) {
    return { id, alert, alertName, address, recorded, type };
  }

  const rows = [
    createData(
      1,
      "Valencia County Fire",
      "Albuquerque",
      "New Mexico",
      "Valencia",
      "Details"
    ),
    createData(
      2,
      "Amarillo Police and Fire",
      "Amarillo",
      "Texas",
      "Randall",
      "Home"
    ),
    createData(
      3,
      "Atlanta Fire Resque",
      "Atlanta (Central)",
      "Georgia",
      "Walton",
      "Home"
    ),
    createData(
      4,
      "Fulton County Fire",
      "Atlanta (Central)",
      "Georgia",
      "Fulton",
      "Home"
    ),
    createData(
      5,
      "Rockdale County Sheriff and Fire",
      "Atlanta (Eastern Suburbs)",
      "Georgia",
      "Walton",
      "Home"
    ),
  ];

  const StyledTableRow = styled(TableRow)(() => ({
    td: { backgroundColor: "white" },
    th: { backgroundColor: "white" },
    // "&:last-child td, &:last-child th": { borderBottom: "unset" },
  }));

  const StyledTableHeaderRow = styled(TableRow)(() => ({
    th: {
      fontSize: ".8rem",
      fontWeight: "bold",
    },
  }));

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterAlert(event.target.value as string);
  };

  return (
    <>
      <div className="flex justify-between mb-4 items-center p-4 bg-white rounded">
        <div className="font-semibold text-xl text-coolGray-800">Scanners</div>
        <div className="w-96 flex">
          <FormControl sx={{ marginRight: "1rem" }} size="small" fullWidth>
            <InputLabel id="state-filter-label">Select state</InputLabel>
            <Select
              labelId="state-filter-label"
              id="state-filter"
              label="Select state"
              value={filterAlert}
              onChange={handleFilterChange}
              MenuProps={MenuProps}
            >
              <MenuItem value={""}>All alerts</MenuItem>
              {usStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
              {/* <MenuItem value={"fire"}>
                Fire alert{" "}
                <LocalFireDepartment color="warning" className="ms-1" />
              </MenuItem>
              <MenuItem value={"police"}>Police alert</MenuItem>
              <MenuItem value={30}>Menu 3</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel id="alert-filter-label">Select alert</InputLabel>
            <Select
              labelId="alert-filter-label"
              id="alert-filter"
              label="Select alert"
              value={filterAlert}
              onChange={handleFilterChange}
            >
              <MenuItem value={""}>All alerts</MenuItem>
              <MenuItem value={"fire"}>
                Fire alert{" "}
                <LocalFireDepartment color="warning" className="ms-1" />
              </MenuItem>
              <MenuItem value={"police"}>Police alert</MenuItem>
              <MenuItem value={30}>Menu 3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Divider />
      <Paper sx={{ width: "100%" }} className="mt-6">
        <TableContainer>
          <Table
            sx={{
              minWidth: 1450,
              overflowX: "scroll",
              marginBottom: "20px",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <StyledTableHeaderRow>
                <TableCell className="uppercase">
                  <div className="font-bold">Receiver</div>
                </TableCell>
                <TableCell className="uppercase">
                  <div className="font-bold">Metro Area</div>
                </TableCell>
                <TableCell className="uppercase">
                  <div className="font-bold">State</div>
                </TableCell>
                <TableCell align="center" className="uppercase">
                  <div className="font-bold">County</div>
                </TableCell>
                <TableCell></TableCell>
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/dashboard/scanners/${row.id}`)}
                >
                  <TableCell>{row.alert}</TableCell>
                  <TableCell scope="row">{row.alertName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell align="center">
                    <div className="font-bold">{row.recorded}</div>
                  </TableCell>
                  <TableCell align="center">Details</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
