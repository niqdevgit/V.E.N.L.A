const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
app.use(express.json())
require('dotenv').config()
app.use(cors())
app.use(express.static('dist'))
const Food = require('./models/food')

app.get('/api/foods', (request, response) => {
  Food.find({}).then(foods => {
    response.json(foods)
  })
})

app.post('/api/foods', (req, res) => {
  const body = req.body
  console.log(body)
  if (body.food === undefined) {
    return res.status(400).json({ error: 'food missing' })
  }

  const food = new Food({
    food: body.food,
    date: body.date,
  })

  food.save().then(savedFood => {
    res.json(savedFood)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})