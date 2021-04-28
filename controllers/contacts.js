const Contacts = require('../model/contacts')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: contacts,
    })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
    try {
      const contact = await Contacts.getById(req.params.contactId)
      if (contact) {
        return res.json({
      status: 'success',
      code: 200,
      data: contact,
      })
      } else {
        return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found',
    })
    }
    } catch (err) {
      next(err)
    }
  }

const create = async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Contact add',
      data: contact,
    })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
      const contact = await Contacts.removeContact(req.params.contactId)
      if (contact) {
        return res.json({
      status: 'success',
      code: 200,
      message: "contact deleted",
      data: contact,
      })
      } else {
        return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found',
    })
    }
    } catch (err) {
      next(err)
    }
}

const updateFavorite = async (req, res, next) => {
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({
      status: 'success',
      code: 200,
      message: 'Get contact',
      data: contact,
      })
      } else {
        return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found',
    })
    }
    } catch (err) {
      next(err)
    }
}

const update = async (req, res, next) => {
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({
      status: 'success',
      code: 200,
      data: contact,
      })
      } else {
        return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found',
    })
    }
    } catch (err) {
      next(err)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
    updateFavorite,
}