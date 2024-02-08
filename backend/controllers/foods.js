const foodsRouter = require('express').Router()
const Food = require('../models/food')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {  
    const authorization = request.get('authorization')  
    if (authorization && authorization.startsWith('Bearer ')) {    
      return authorization.replace('Bearer ', '')  
    }  
  return null
  }

foodsRouter.get('/', async (req, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req),
    config.JWT_SECRET)
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

foodsRouter.post('/', async (req, res) => {
  try{
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req),
  config.JWT_SECRET)

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
} catch (error) {
  response.status(500).json({ error: error.message })
  }
})


module.exports = foodsRouter