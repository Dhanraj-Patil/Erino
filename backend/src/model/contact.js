const { Schema, mongo } = require("mongoose");

const Contact = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  company: String,
  jobTitle: String,
});

module.exports = Contact;
