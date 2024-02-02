const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
app.use(express.json())
require('dotenv').config()
app.use(cors())
app.use(express.static('dist'))
const Food = require('./models/food')
const User = require('./models/user')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.startsWith('Bearer ')) {    
    return authorization.replace('Bearer ', '')  
  }  
return null
}

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/api/foods', (request, response) => {
  const username = request.query
  console.log("query",request.query)
  console.log("username",username)
  Food.find({})
  .populate('user', { username: 1, name: 1 })
  .then(foods => {
    response.json(foods)
  })
})

app.post('/api/foods', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req),
  process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })  
  }  

  const user = await User.findById(decodedToken.id)
  
  if (body.food === undefined) {
    return res.status(400).json({ error: 'food missing' })
  }

  const food = new Food({
    food: body.food,
    date: body.date,
    user: user._id
  })

  const savedFood = await food.save()
  user.foods = user.foods.concat(savedFood._id)
  await user.save()
  
  res.json(savedFood)
})



app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})