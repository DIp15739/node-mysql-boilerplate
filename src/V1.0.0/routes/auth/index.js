const express = require('express')
const route = express.Router()

route.use('', require('./authRoutes'))

module.exports = route
