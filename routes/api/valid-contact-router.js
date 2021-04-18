const joi = require('joi');

const schemaCreateContact = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: joi.string().max(16).pattern(/^\([\d]{2,3}\)\[\d]{2,3}-[\d]{3,4}$/).optional()
 })

 const schemaPutContact = joi.object({
    name: joi.string().min(3).max(30).optional(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: joi.string().max(16).pattern(/^\([\d]{2,3}\)\[\d]{2,3}-[\d]{3,4}$/).optional()
 }).or('name', 'email', 'phone')

 const schemaPatchContact = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: joi.string().max(16).pattern(/^\([\d]{2,3}\)\[\d]{2,3}-[\d]{3,4}$/).optional()
 })
 
const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
        next({ status: 400, message: err.message.replace(/"/g, "'")})
 }
}

const validationCreateContact = async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next)
}
const validationPutContact = async (req, res, next) => {
    return await validate(schemaPutContact, req.body, next)
}
    const validationPatchContact = async (req, res, next) => {
    return await validate(schemaPatchContact, req.body, next)
}

module.exports = {
    validationCreateContact,
    validationPutContact,
    validationPatchContact,
}