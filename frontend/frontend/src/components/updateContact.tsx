import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "../axios";

interface Prop {
  edit: boolean;
  setEdit: Function;
  contact: Object;
  getContact: Function;
}

const UpdateContact = ({ edit, setEdit, contact, getContact }: Prop) => {
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [company, setCompany] = useState(contact.company);
  const [title, setTitle] = useState(contact.jobTitle);

  useEffect(() => {
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setEmail(contact.email);
    setPhone(contact.phone);
    setCompany(contact.company);
    setTitle(contact.jobTitle);
  }, [contact]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    axios
      .put(`/contacts/${email}`, formJson)
      .then((response) => {
        if (response.data.status == "OK") {
          alert("Contact Updated");
          getContact();
          setEdit(false);
        } else if (response.data.status == "BAD") {
          alert(`Contact updation failed. Reason: ${response.data.message}`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Dialog
        open={edit}
        onClose={() => setEdit(false)}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <TextField
            required
            style={{ margin: "20px" }}
            // margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            style={{ margin: "20px" }}
            //
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // fullWidth
          />
          <TextField
            required
            style={{ margin: "20px" }}
            // margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
            // fullWidth
          />
          <TextField
            required
            // margin="dense"
            style={{ margin: "20px" }}
            id="phone"
            name="phone"
            label="Phone Number"
            type="number"
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // fullWidth
          />
          <TextField
            required
            // margin="dense"
            style={{ margin: "20px" }}
            id="company"
            name="company"
            label="Company"
            type="text"
            variant="standard"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            // fullWidth
          />
          <TextField
            required
            // margin="dense"
            style={{ margin: "20px" }}
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            type="text"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateContact;
