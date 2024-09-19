const express = require('express')
const router = express.Router()

router.use('/resource', require('./routes/resource'))
router.use('/auth', require('./routes/auth'))

module.exports = router
