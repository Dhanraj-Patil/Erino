const { Schema, mongo } = require("mongoose");

const Contact = new Schema({
  _id: {
    type: mongo.ObjectId,
    default: new mongo.ObjectId(),
  },
  firstName: String,
  lastName: String,
  email: {
    unique: true,
    type: String,
  },
  phone: {
    unique: true,
    type: String,
  },
  company: String,
  jobTitle: String,
});

module.exports = { Contact };
