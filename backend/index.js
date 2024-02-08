const config = require('./utils/config')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
app.use(express.json())
require('dotenv').config()
app.use(cors())
app.use(express.static('dist'))
const mongoose = require('mongoose')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const foodsRouter = require('./controllers/foods')

app.use('/api/foods', foodsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

mongoose.set('strictQuery', false)
console.log('connecting to mongo')
mongoose.connect(config.MONGODB_URI)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
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

const PORT = config.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})