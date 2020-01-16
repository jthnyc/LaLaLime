const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

router.post('/order', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: 'pending'
      }
    })
    let currentOrder
    //if the user does not have pending order, create a new order
    if (!existingOrder) {
      currentOrder = await Order.create({userId: req.body.userId})
    } else {
      currentOrder = existingOrder
    }
    //adding current product to the current order
    const currentProduct = await Product.findOne({
      where: {id: req.body.productId}
    })
    await currentOrder.addProduct(currentProduct)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})
