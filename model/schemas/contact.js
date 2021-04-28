const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
},
    {
        versionKey: false,
        timestamps: true
    },
)

const Contact = model('contact', contactsSchema)

module.exports = Contact