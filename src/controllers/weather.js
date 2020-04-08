const weatherService = require('../services/weather')

class WeatherController {
  async index(req, res) {
    try {
      const {
        nameCity,
        listForecast,
      } = await weatherService.getForecastMaceioNextFiveDays()

      res.render('index', {
        city: nameCity,
        listForecast,
      })
    } catch (error) {
      console.log(error)
      res.render('index', {
        city: 'city not found',
        listForecast: [],
      })
    }
  }

  async show(req, res) {
    try {
      const city = req.body.city

      const {
        nameCity,
        listForecast,
      } = await weatherService.getForecastNextFiveDays(city)

      res.render('index', {
        city: nameCity,
        listForecast,
      })
    } catch (error) {
      console.log(error)
      res.render('index', {
        city: 'city not found',
        listForecast: [],
      })
    }
  }
}

module.exports = new WeatherController()
