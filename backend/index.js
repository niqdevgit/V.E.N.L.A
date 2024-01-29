const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const foods = require('./data');


app.use(cors())
app.use(express.static('dist'))


app.get('/api/foods', (request, response) => {
  response.json(foods)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})