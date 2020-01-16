const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

router.post('/order', async (req, res, next) => {
  try {
    const newOrder = await Order.create({userId: req.body.userId})
    const currentProduct = await Product.findOne({
      where: {id: req.body.productId}
    })
    await newOrder.addProduct(currentProduct)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})
