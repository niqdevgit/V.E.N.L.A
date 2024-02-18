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


foodsRouter.delete('/', async (req, res) => {
  try{
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req),
  config.JWT_SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })  
  }  

  if (body.id === undefined) {
    return res.status(400).json({ error: 'id missing' })
  }

  const foodToDelete = await Food.findById(body.id)
    
  if (!foodToDelete) {
    return res.status(404).json({ error: 'Food not found' })
  }

  const user = await User.findById(decodedToken.id)
  const food = await Food.findById(body.id)

  if (food.user.equals(user._id)) {
    try {
      await Food.findByIdAndDelete(body.id)
      await User.findByIdAndUpdate(user._id, {$pull: {foods: food._id}})
      res.status(204).end()
    }catch {
      res.status(500).json({ error: error.message })
    }
  } else {
    return res.status(403).json({error : 'You can only delete own foods'})
  }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

})
 

module.exports = foodsRouter