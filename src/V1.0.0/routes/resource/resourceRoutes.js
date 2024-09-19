const express = require('express')
const router = new express.Router()
const resource = require('../../controller/resource/resourceController')
const token = require('../../middleware/auth')

router.post('', token.verifyTokenAuthentication(), async (req, res, next) => {
  const options = req.body

  try {
    const result = await resource.resourceAdd(options)
    res.status(`${result.code}`).send({ ...result })
    return next(JSON.stringify(result))
  } catch (err) {
    return next(err)
  }
})

router.get('', token.verifyTokenAuthentication(), async (req, res, next) => {
  try {
    const options = req.query
    const result = await resource.resourcesList(options)
    res.status(`${result.code}`).send({ ...result })
    return next(JSON.stringify(result))
  } catch (err) {
    return next(err)
  }
})

router.get(
  '/:id',
  token.verifyTokenAuthentication(),
  async (req, res, next) => {
    const options = req.params.id
    try {
      const result = await resource.resourceGet(options)
      res.status(`${result.code}`).send({ ...result })
      return next(JSON.stringify(result))
    } catch (err) {
      return next(err)
    }
  }
)

router.put(
  '/:id',
  token.verifyTokenAuthentication(),
  async (req, res, next) => {
    const options = {
      ...req.body,
      id: req.params.id,
    }
    try {
      const result = await resource.resourceUpdate(options)
      res.status(`${result.code}`).send({ ...result })
      return next(JSON.stringify(result))
    } catch (err) {
      return next(err)
    }
  }
)

router.delete(
  '/:id',
  token.verifyTokenAuthentication(),
  async (req, res, next) => {
    const options = req.params.id
    try {
      const result = await resource.resourceDelete(options)
      res.status(`${result.code}`).send({ ...result })
      return next(JSON.stringify(result))
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = router
