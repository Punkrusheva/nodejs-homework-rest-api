const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationPutContact,
  validationPatchContact,
  validationObjectId} = require('../contacts/valid-contact-router')
const guard = require('../../helpers/guard')

router.get('/', guard, ctrl.getAll)
      .post('/', guard, validationCreateContact, ctrl.create)

router.get('/:contactId', guard, validationObjectId, ctrl.getById)
      .delete('/:contactId', guard, ctrl.remove)
      .put('/:contactId', guard, validationPutContact, ctrl.update)

router.patch('/:contactId/favorite', guard, validationPatchContact, ctrl.updateFavorite)

module.exports = router
