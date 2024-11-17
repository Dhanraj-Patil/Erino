require("dotenv").config();
const mongoose = require("mongoose");
const ContactSchema = require("../model/contact");

const main = async () => {
  console.log(process.env.MONGO);
  await mongoose.connect(process.env.MONGO);
  console.log("Successfully connected to MongoDB");
};

main().catch((error) => {
  console.error(error);
});

const Contacts = mongoose.model("Contacts", ContactSchema);

module.exports = { Contacts };
