const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  try{
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

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  //token expires in 1 week
  const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60*10080 }) 

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
  } catch (error) {
    response.status(401).json({
      error: 'invalid username or password'
    })
  }
})

module.exports = loginRouter