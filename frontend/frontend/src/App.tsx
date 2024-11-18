import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import Contact from "./components/contact";
import axios from "./axios";
import UpdateContact from "./components/updateContact";

function App() {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState({});

  // const data = [
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  //   {
  //     firstName: "Dhanraj",
  //     lastName: "Patil",
  //     email: "dhanraj@testing.com",
  //     phone: "1234567890",
  //     company: "Erino",
  //     jobTitle: "SDE",
  //   },
  // ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    axios
      .get("/contacts")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (email: String) => {
    axios
      .delete(`/contacts/${email}`)
      .then((response) => {
        if (response.data.status === "success") {
          alert("Contact Deleted");
          getContacts();
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = (contact: Object) => {
    setUpdate(contact);
    setEdit(true);
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const visibleRows = useMemo(
    () => [...data].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, data],
  );

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <h2>Erino Contacts List</h2>
        <div style={{ margin: "20px" }}>
          <Button variant="contained" onClick={handleStatusChange}>
            Add Contact +
          </Button>
        </div>
        <Contact status={open} setStatus={setOpen} getContacts={getContacts} />
        <UpdateContact
          edit={edit}
          setEdit={setEdit}
          contact={update}
          getContact={getContacts}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.company}</TableCell>
                  <TableCell align="right">{row.jobTitle}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      size="small"
                      aria-label="Edit contact"
                      onClick={() => handleUpdate(row)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    /
                    <IconButton
                      color="secondary"
                      size="small"
                      aria-label="Delete contact"
                      onClick={() => handleDelete(row.email)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default App;
