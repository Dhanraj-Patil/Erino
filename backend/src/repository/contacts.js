const { Contacts } = require("../config/mongo");

const create = async (contact) => {
  try {
    // console.log(contact);
    const Contact = new Contacts(contact);
    console.log(Contact);
    await Contact.save();
  } catch (error) {
    console.error(error);
    throw new Error(error.errorResponse.code);
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
    console.log(await Contacts.updateOne({ email: contactId }, contact).exec());
  } catch (error) {
    console.error(error);
    throw new Error(error.errorResponse.code);
  }
};

const deleteBy = async (contactId) => {
  try {
    await Contacts.deleteOne({ email: contactId });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { create, getAll, updateBy, deleteBy };
