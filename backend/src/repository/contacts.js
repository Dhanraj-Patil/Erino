const { Contacts } = require("../config/mongo");

const create = async (contact) => {
  try {
    const Contact = new Contacts(contact);
    await Contact.save();
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    return await Contacts.find();
  } catch (error) {
    console.log(error);
  }
};

const updateBy = async (contactId, contact) => {
  try {
    const Update = new Contacts(contact);
    await Contacts.findOneAndUpdate({ _id: contactId }, Update);
  } catch (error) {
    console.log(error);
  }
};

const deleteBy = async (contactId) => {
  try {
    await Contacts.deleteOne({ _id: contactIds });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { create, getAll, updateBy, deleteBy };
