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

router.get('/:SKU', async (req, res, next) => {
  try {
    const SKU = req.params.SKU
    const product = await Product.findAll({
      where: {
        SKU: SKU
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
