// const shortid = require('shortid')
const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
// const { query, validationResult } = require('express-validator')

const contactsPath = path.join(__dirname, '../../model/contacts.json')

router.get('/', async (_req, res, next) => {
  function listContacts () {
    fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
      if (err) { console.log(err.message) } else {
        const contacts = JSON.parse(data)
        res.json(contacts)
      }
    })
  }
  try {
    listContacts()
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId',
// [query('contactId').isNumeric()],
  async (req, res, next) => {
    /* const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } */
    function getById(contactId) {
      contactId = Number(contactId)
      fs.readFile(contactsPath, { encoding: 'utf8' }, (err, data) => {
        if (err) { console.log(err.message) } else {
          const contacts = JSON.parse(data)
          const contact = contacts.find(contact => contact.id === contactId)
          res.json(contact)
        }
      })
    }
    try {
      const { contactId } = req.params
      getById(contactId)
    } catch (err) {
      next(err)
      // res.status(404).json({ message: 'Not found' })
    }
  })
/*
router.post('/', [query('contactId').isNumeric(), query('name').isString(), query('email').isEmail(), query('phone').isMobilePhone()], async (req, res, next) => {
  const errors = validationResult(res)
  if (!errors.isEmpty()) {
    return res.statusMessage(400).json({ errors: errors.array() })
  }
  res.json({ message: 'template message' })
})

router.delete('/:contactId', [query('contactId').isNumeric()], async (req, res, next) => {
  const errors = validationResult(res)
  if (!errors.isEmpty()) {
    return res.statusMessage(400).json({ errors: errors.array() })
  }
  res.json({ message: 'template message' })
})

router.patch('/:contactId', [query('contactId').isNumeric(), query('name').isString(), query('email').isEmail(), query('phone').isMobilePhone()], async (req, res, next) => {
  const errors = validationResult(res)
  if (!errors.isEmpty()) {
    return res.statusMessage(400).json({ errors: errors.array() })
  }
  res.json({ message: 'template message' })
})
*/
module.exports = router
