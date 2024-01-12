import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants/BackendUrl";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Contacts() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const [contacts, setContacts] = useState([]);
  console.log("contacts:", contacts);
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/contacts`).then((response) => {
      // Sort the contacts array in ascending order by ID before setting it to the state
      const sortedContacts = response.data.sort((a, b) => a.id - b.id);
      setContacts(sortedContacts);
    });
  }, []);

  //The handleEditClick function sets the editContactId and editFormData for the clicked row.
  const handleEditClick = (contact) => {
    setEditContactId(contact.id);
    setEditFormData(contact);
  };

  //The handleCancel function cancels the editing process.
  const handleCancel = () => {
    setEditContactId(null);
  };

  //The handleSave function sends the updated data to the server with a PUT request and updates the local contacts state with the new data.
  const handleSave = async (id) => {
    await axios.put(`${BACKEND_URL}/contacts/${id}`, editFormData);
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, ...editFormData };
      }
      return contact;
    });
    setContacts(updatedContacts);
    setEditContactId(null);
  };

  //The handleInputChange function updates the editFormData as the user types into the input fields.
  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  //When the "Delete" button is clicked, handleDeleteClick is called, which opens a dialog asking for confirmation.
  const handleDeleteClick = (contact) => {
    setConfirmDeleteId(contact.id);
    setDialogOpen(true);
  };

  //If the user confirms the deletion, handleDeleteConfirm is called, which makes a DELETE request to the backend and removes the contact from the local state.
  const handleDeleteConfirm = async () => {
    await axios.delete(`${BACKEND_URL}/contacts/${confirmDeleteId}`);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== confirmDeleteId
    );
    setContacts(updatedContacts);
    setDialogOpen(false);
  };

  //If the user cancels the deletion, handleDeleteCancel is called, which closes the dialog without making any changes.
  const handleDeleteCancel = () => {
    setDialogOpen(false);
  };

  return (
    <div style={{ margin: "10px 10px" }}>
      <Button variant="outlined">
        <Link to="/Contacts/add" style={linkStyle}>
          {"New Contact"}
        </Link>
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>UEN</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              // A React.Fragment is used to group the original TableRow and the new TableRow for the editable fields. This allows both rows to share the same key.
              <React.Fragment key={contact.id}>
                <TableRow>
                  <TableCell>{contact.id}</TableCell>
                  <TableCell>{contact.company_name}</TableCell>
                  <TableCell>{contact.uen}</TableCell>
                  <TableCell>{contact.customer_name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    {new Date(contact.createdAt).toLocaleString("en-SG", {
                      timeZone: "Asia/Singapore",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(contact.updatedAt).toLocaleString("en-SG", {
                      timeZone: "Asia/Singapore",
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(contact)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteClick(contact)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                {editContactId === contact.id && (
                  // Editable row
                  <TableRow>
                    <TableCell colSpan={8}>
                      {/* A Grid container is used to wrap the TextField components. This allows you to specify the width of each field as a fraction of the total width, ensuring that they are evenly spaced. */}
                      <Grid container spacing={0.6}>
                        <Grid item xs={0.6}>
                          <TextField
                            label="ID"
                            name="id"
                            value={editFormData.id}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Company name"
                            name="company_name"
                            value={editFormData.company_name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Customer name"
                            name="customer_name"
                            value={editFormData.customer_name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Phone"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="outlined"
                            onClick={() => handleSave(contact.id)}
                          >
                            Save
                          </Button>
                          <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this contact?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Contacts;
