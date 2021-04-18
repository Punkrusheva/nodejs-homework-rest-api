const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {
  validationCreateContact,
  validationPutContact,
  validationPatchContact } = require('./valid-contact-router')
console.log(validationCreateContact)
console.log(validationPutContact)
console.log(validationPatchContact)

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      message: 'All Contacts',
      data: contacts,
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.contactId)
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
  })

router.post('/', validationCreateContact,
  async (req, res, next) => {
   try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Contact add',
      data:  contact,
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
      const contact = await Contacts.removeContact(req.params.contactId)
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
})

router.patch('/:contactId',validationPatchContact, 
  async (req, res, next) => {
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
})

router.put('/:contactId', validationPutContact, 
  async (req, res, next) => {
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
})
module.exports = router
