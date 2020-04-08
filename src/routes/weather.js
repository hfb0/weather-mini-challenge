const router = require('express').Router()

const weatherController = require('../controllers/weather')

router.get('/', weatherController.index)

// router.post('/', weatherController.index)

module.exports = router
