const router = require('express').Router()
const {Legging} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const leggings = await Legging.findAll({
      attributes: ['productId', 'name', 'imageUrl']
    })
    res.json(leggings)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const legging = await Legging.findOne({
      where: {
        productId: productId
      }
    })
    res.json(legging)
  } catch (error) {
    next(error)
  }
})
