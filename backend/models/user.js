const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Food = require('./food')

const userSchema = mongoose.Schema({
    username: {    
        type: String,    
        required: true,    
        unique: true  
    },
    name: String,
    passwordHash: String,
    foods: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
        }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User