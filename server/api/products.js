const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['name', 'imageUrl']
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:lineId', async (req, res, next) => {
  try {
    const lineId = req.params.lineId
    const product = await Product.findAll({
      where: {
        lineId: lineId
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
