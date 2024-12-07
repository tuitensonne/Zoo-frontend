import * as React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

// Example data
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Jelly Bean", 375, 0, 94, 0),
  createData("Lollipop", 392, 0.2, 98, 0),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("KitKat", 518, 26.0, 65, 7.0),
];

export default function VetDashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState<null | (typeof rows)[0]>(
    null
  );

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (row: (typeof rows)[0]) => {
    setSelectedRow(row);
  };

  const handleReturnToTable = () => {
    setSelectedRow(null);
  };

  if (selectedRow) {
    // Detail View
    return (
      <Box sx={{ width: "90%", margin: "0 auto", mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Details for: {selectedRow.name}
        </Typography>
        <Typography variant="body1">
          <strong>Calories:</strong> {selectedRow.calories}
        </Typography>
        <Typography variant="body1">
          <strong>Fat:</strong> {selectedRow.fat} g
        </Typography>
        <Typography variant="body1">
          <strong>Carbs:</strong> {selectedRow.carbs} g
        </Typography>
        <Typography variant="body1">
          <strong>Protein:</strong> {selectedRow.protein} g
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleReturnToTable}>
            Return to Table
          </Button>
        </Box>
      </Box>
    );
  }

  // Table View
  return (
    <Box sx={{ width: "90%", margin: "0 auto", mt: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="paginated table with details">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewDetails(row)}
                  >
                    More Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
