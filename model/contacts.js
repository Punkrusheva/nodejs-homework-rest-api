const Contacts = require('./schemas/contact')

const listContacts = async () => {
  const results = await Contacts.find({})
  return results
}

const getById = async (contactId) => {
  const result = await Contacts.findOne({ _id: contactId })
  return result
}

const removeContact = async (contactId) => {
  const result = await Contacts.findByIdAndRemove({ _id: contactId  })
  return result
}

const addContact = async (body) => {
  const result = await Contacts.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact
}
