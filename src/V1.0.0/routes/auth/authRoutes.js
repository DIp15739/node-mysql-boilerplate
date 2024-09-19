const express = require('express')
const router = new express.Router()
const auth = require('../../controller/auth/authController')
const logger = require('../../../../logger')

router.post('/login', async (req, res, next) => {
  try {
    const options = req.body
    const result = await auth.logIn(options)
    res.status(`${result.code}`).send({ ...result })
    return next(JSON.stringify(result))
  } catch (err) {
    return next(err)
  }
})

module.exports = router
