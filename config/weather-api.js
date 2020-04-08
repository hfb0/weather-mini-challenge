require('dotenv').config()

module.exports = {
  API_URL: 'https://api.openweathermap.org/data/2.5/forecast',
  API_KEY: process.env.API_KEY,
  CITY_NAME_DEFAULT: 'Maceio',
}
