const express = require('express')
const app = express()

// Import route
const weatherRoute = require('./routes/weather')

// Use view engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/', weatherRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server starting at port ${PORT}`)
})
