const axios = require('axios')
const moment = require('moment')
const config = require('../../config/weather-api')

const utilsService = require('./utils')

class WeatherService {
  async getForecastNextFiveDays(city) {
    // fetch data from a url endpoint
    const response = await axios.get(config.API_URL, {
      params: {
        q: city,
        appid: config.API_KEY,
      },
    })

    const listForecast = this.formatListForecast(response.data.list)
    const nameCity = response.data.city.name

    return { nameCity, listForecast }
  }

  async getForecastMaceioNextFiveDays() {
    const { nameCity, listForecast } = await this.getForecastNextFiveDays(
      config.CITY_NAME_DEFAULT
    )

    return { nameCity, listForecast }
  }

  formatListForecast(listForecast) {
    // Get main properties
    let daysNotGoToBeach = utilsService.getRequiredData(listForecast)

    // Filters past times and rainy days
    daysNotGoToBeach = this.getSuitableDates(daysNotGoToBeach)

    // Remove equal days of the week
    daysNotGoToBeach = utilsService.removeDuplicity(daysNotGoToBeach)

    return daysNotGoToBeach
  }

  getSuitableDates(listForecast) {
    const today = moment()

    return listForecast.filter(
      (forecast) =>
        !forecast.goToBeach &&
        forecast.dt.isAfter(today) &&
        this.isIdealTimeGoToBeach(forecast.dt)
    )
  }

  // Avoid night periods
  isIdealTimeGoToBeach(momentDatatime) {
    const earlyMorning = moment(momentDatatime).hour(8)
    const lateMorning = moment(momentDatatime).hour(11)

    const earlyAfternoon = moment(momentDatatime).hour(14)
    const lateAfternoon = moment(momentDatatime).hour(18)

    const isMorning = momentDatatime.isBetween(earlyMorning, lateMorning)
    const isAfternoon = momentDatatime.isBetween(earlyAfternoon, lateAfternoon)

    return isMorning || isAfternoon
  }
}

module.exports = new WeatherService()
