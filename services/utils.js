const moment = require('moment')

class UtilsService {
  getRequiredData(listForecast) {
    return listForecast.map((forecast) => ({
      dt: moment.unix(forecast.dt).utc(),
      dayOfWeek: moment.unix(forecast.dt).utc().format('dddd'),
      dt_txt: forecast.dt_txt,
      humidity: forecast.main.humidity,
      temp: forecast.main.temp,
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
      goToBeach: forecast.main.humidity <= 70,
    }))
  }

  removeDuplicity(arr) {
    return arr.reduce((acc, current) => {
      const item = acc.find((item) => item.dayOfWeek === current.dayOfWeek)
      if (!item) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])
  }
}

module.exports = new UtilsService()
