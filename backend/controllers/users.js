const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Food = require('../models/food')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('foods',{ food: 1, date: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
  const { username, password } = request.body

  const olduser = await User.findOne({ username })
  if(olduser){
    return response.status(409).json({
      error: 'Username used already'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
  } catch (error) {
  response.status(500).json({ error: error.message })
  }
})

usersRouter.put('/', async (request, response) => {
  const { username, password, newpassword } = request.body
  
  
  const olduser = await User.findOne({ username })
  
  const passwordCorrect = olduser === null
  ? false
  : await bcrypt.compare(password, olduser.passwordHash)
  
  if (!(olduser && passwordCorrect)) {
    
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  
  if (username === 'vieras') {
    return response.status(401).json({
      error: 'cannot change visitor password'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newpassword, saltRounds)
  const user = {
    username,
    passwordHash,
  }
  
  
  User.findByIdAndUpdate(olduser, user, { new: true })
    .then(updatedUser => {
      response.status(200).json(updatedUser)
    })
    
})



usersRouter.delete('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {

    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (username === 'vieras') {
    return response.status(401).json({
      error: 'cannot delete visitor'
    })
  }

  
  try {
    await Food.deleteMany({ user: user._id })

  } catch (error) {
    console.log("Error:",error)
  }
  

  User.findOneAndDelete({ username })
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'User not found' })
      }
    })
})


module.exports = usersRouter