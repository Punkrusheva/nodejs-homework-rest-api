const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationPutContact,
  validationPatchContact,
  validationObjectId} = require('../contacts/valid-contact-router')

router.get('/', ctrl.getAll)
      .post('/', validationCreateContact, ctrl.create)

router.get('/:contactId', validationObjectId, ctrl.getById)
      .delete('/:contactId', ctrl.remove)
      .put('/:contactId', validationPutContact, ctrl.update)

router.patch('/:contactId/favorite', validationPatchContact, ctrl.updateFavorite)

module.exports = router
