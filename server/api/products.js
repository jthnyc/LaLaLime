const router = require('express').Router()
const { Products } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll({
      attributes: ['productId', 'name', 'imageUrl'],
      include: [{
        model: Leggings
      }]
    })
    res.json(leggings)
  } catch (error) {
    next(error)
  }
})

router.get('/:product', async (req, res, next) => {
  try {
    const productName = req.params.productName
    const product = await Leggings.findAll({
      attributes: ['productId', 'name', 'imageUrl']
    })
    res.json(leggings)
  } catch (error) {
    next(error)
  }
})

router.get('/leggings/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const legging = await Leggings.findOne({
      where: {
        productId: productId
      }
    })
    res.json(legging)
  } catch (error) {
    next(error)
  }
})



