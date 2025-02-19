const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength: 5,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8
      },
      message: () => 'Invalid number must have format XX-XXXXXXX or XXX-XXXXXXXX.'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
