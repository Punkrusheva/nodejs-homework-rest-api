const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validationQueryContact,
  validationCreateContact,
  validationPutContact,
  validationPatchContact,
  validationObjectId} = require('../contacts/valid-contact-router')
const guard = require('../../helpers/guard')

router.get('/', guard, validationQueryContact, ctrl.getAll)
      .post('/', guard, validationCreateContact, ctrl.create)

router.get('/:id', guard, validationObjectId, ctrl.getById)
      .delete('/:id', guard, ctrl.remove)
      .put('/:id', guard, validationPutContact, ctrl.update)

router.patch('/:id/favorite', guard, validationPatchContact, ctrl.updateFavorite)

module.exports = router
