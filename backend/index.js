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

app.use('/api/users', usersRouter)

app.get('/api/foods', (request, response) => {
  Food.find({}).then(foods => {
    response.json(foods)
  })
})

app.post('/api/foods', async (req, res) => {
  const body = req.body
  if (body.food === undefined) {
    return res.status(400).json({ error: 'food missing' })
  }

  const user = await User.findById(body.userId)

  const food = new Food({
    food: body.food,
    date: body.date,
    user: user ? user._id : '0000'  //temporary fix for visitor. Orginal line -> user: user._id
  })

  const savedFood = await food.save()
  user.foods = user.foods.concat(savedFood._id)
  await user.save()
  
  res.json(savedFood)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})