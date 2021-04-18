const db = require('./db')
const { v4: uuidv4 } = require('uuid')

const listContacts = async () => {
  return db.get('contacts').value()
}

const getContactById = async (contactId) => {
  return db.get('contacts').find({id: contactId }).value()
}

const removeContact = async (contactId) => {
  const [user] = db.get('contacts').remove({ id: contactId }).write()
  return user
}

const addContact = async (body) => {
  const id = uuidv4()
  const user = {
    id,
    ...body,
    ...(body.name ? {} : { name: '' }),
    ...(body.email ? {} : { email: '' }),
    ...(body.phone ? {} : { phone: '' }),
  }
  db.get('contacts').push(user).write()
  return user
}

const updateContact = async (contactId, body) => {
  const user = db.get('contacts').find({ id: contactId }).assign(body).value()
  db.write()
  return user.id ? user : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
