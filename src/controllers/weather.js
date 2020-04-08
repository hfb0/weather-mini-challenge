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
}

module.exports = new WeatherController()
