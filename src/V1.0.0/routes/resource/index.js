const express = require('express')
const router = express.Router()

router.use('', require('./resourceRoutes'))

module.exports = router
