const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


console.log('connecting to mongo')
mongoose.connect(process.env.MONGODB_URI)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const foodSchema = new mongoose.Schema({
  food: String,
  date: String,
  user: {   
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'User'  
    }
})

foodSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Food', foodSchema)