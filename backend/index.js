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

app.get('/api/foods', async (req, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req),
    process.env.JWT_SECRET)
    //if token included, return "data of the request user"
    if (decodedToken.username) {
      const userFoods = await Food.find({ user: decodedToken.id })
       return response.json({
        data: userFoods,
        status: "solo"
      })
    }
  } 
 catch{
  //else no token, return "global data"
  Food.find({})
    .then(foods => {
      const formattedFoods = foods.map(food => ({
        food: food.food,
        date: food.date,
        id: food.id
      }));

      response.json({
        data: formattedFoods,
        status: "global"
      })
  })
}

})

app.post('/api/foods', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req),
  process.env.JWT_SECRET)

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

app.get('/styles/default.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'styles', 'default.css'))
})

app.get('/styles/dark.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'styles', 'dark.css'))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})