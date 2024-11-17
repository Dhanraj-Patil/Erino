const ContactsRepository = require("../repository/contacts");

const create = async (contact) => {
  await ContactsRepository.create(contact);
};

const getAllContacts = async () => {
  return await ContactsRepository.getAll();
};

const update = async (contactId, contact) => {
  await ContactsRepository.updateBy(contactId, contact);
};

const deleteOne = async (contactId) => {
  await ContactsRepository.deleteBy(contactId);
};

module.exports = { create, getAllContacts, update, deleteOne };
