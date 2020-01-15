const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

router.post('/order', async (req, res, next) => {
  try {
    console.log('reqbody', req.body)
    const newOrder = await Order.create()
    console.log('newOrder', newOrder)
    // const currentUser = User.findOne({
    //   where: {
    //     id: req.body.userId
    //   }
    // })
    // newOrder.setUser(currentUser)
    // const currentProduct = await Product.findOne({
    //   where: {id: req.body.productId}
    // })
    // newOrder.hasProduct(currentProduct)
  } catch (error) {
    next(error)
  }
})
