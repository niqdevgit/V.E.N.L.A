const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
//const foods = require('./data')
app.use(express.json())

app.use(cors())
app.use(express.static('dist'))

let foods = [
  {
    id: 1,
    food: "Pitsa",
    date: "20.1.2024"
  },
  {
    id: 2,
    food: "Pitsa",
    date: "13.1.2024"
  },
  {
    id: 3,
    food: "Kebab",
    date: "21.1.2024"
  }
]

app.get('/api/foods', (request, response) => {
  response.json(foods)
})

app.post('/api/foods', (req, res) => {
  const maxId = foods.length > 0
    ? Math.max(...foods.map(n => n.id)) 
    : 0

  const food = req.body
  food.id = maxId + 1

  foods = foods.concat(food)
  
  res.json(food)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})