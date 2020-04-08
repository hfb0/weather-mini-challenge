const express = require('express')

const weatherRoute = require('./routes/weather')

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    // Use view engine
    this.server.set('view engine', 'ejs')
    this.server.set('views', './src/views')

    this.server.use(express.static('./src/public'))
    this.server.use(express.urlencoded({ extended: true }))
  }

  routes() {
    this.server.use('/', weatherRoute)
  }
}

module.exports = new App().server
