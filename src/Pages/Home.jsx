import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import "./Home.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Link } from "react-router-dom";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetDatafromApi()
  }, []);

  const [storeLastId,setStoreLastId]= useState(null);
  const fetDatafromApi =()=>{
    if(storeLastId === null){
      axios.get("https://api.rarible.org/v0.1/items/all").then((res) => {
        console.log(res.data.items)
        setPosts(res.data.items);
        setStoreLastId(res.data.items[res.data.items.length - 1].id)

      });
    }else{
      axios.get(`https://api.rarible.org/v0.1/items/all?size=8?continuation=${storeLastId}`).then((res) => {
        setPosts([...posts, ...res.data.items]);
        setStoreLastId(res.data.items[res.data.items.length - 1].id)
      });
    }
   
    setStoreLastId()
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  const handleChangePage = (event, newPage) => {

    setPage(newPage);
    fetDatafromApi();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div>
      <CssBaseline />
      <Container sx={{ bgcolor: "#f8f8f8" }} sx={{ marginTop: "2%" }}>
        <Box component="span">
          <Typography variant="h5">Testing Rarible NFT API</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell width={"20%"}>
                  <Typography variant="h6" textAlign={"center"}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell width={"20%"}>
                  <Typography variant="h6" textAlign={"center"}>
                    Currency
                  </Typography>
                </TableCell>
                <TableCell width={"20%"}>
                  <Typography variant="h6" textAlign={"center"}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell width={"20%"}>
                  <Typography variant="h6" textAlign={"center"}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell width={"20%"}>
                  <Typography variant="h6" textAlign={"center"}>
                    Price
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? posts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : posts
              ).map((row, i) => (

                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" width={"20%"} textAlign={"center"}>
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" width={"20%"} textAlign={"center"}>
                    <Link to={`/view/${row.id}`}>{row.meta.name}</Link>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left" width={"20%"} textAlign={"center"}>
                    {row.blockchain}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left" width={"20%"} textAlign={"center"}>
                    <img src={row.meta.content[0].url || ""} width={100} height={100} />
                  </TableCell>
                </TableRow>

              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={posts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Home;
