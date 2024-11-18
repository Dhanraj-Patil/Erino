import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "../axios";

interface Props {
  status: boolean;
  setStatus: Function;
  getContacts: Function;
}

const Contact = ({ status, setStatus, getContacts }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    axios.post("/contacts", formJson).then((response) => {
      if (response.data.status == "OK") {
        getContacts();
        setStatus(false);
      } else if (response.data.status == "BAD") {
        alert(`Contact creation failed. Reason: ${response.data.message}`);
      }
    });
  };

  return (
    <div>
      <Dialog
        open={status}
        onClose={() => setStatus(false)}
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
            // fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatus(false)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Contact;
