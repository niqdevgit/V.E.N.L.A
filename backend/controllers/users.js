const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('foods',{ food: 1, date: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


usersRouter.delete('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  console.log(user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    console.log("we if bois")
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  User.findOneAndDelete({ username })
    .then(result => {
      if (result) {
        console.log("User deleted successfully")
        response.status(204).end()
      } else {
        console.log("User not found")
        response.status(404).json({ error: 'User not found' })
      }
    })
})


module.exports = usersRouter