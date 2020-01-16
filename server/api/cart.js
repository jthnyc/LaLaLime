const router = require('express').Router()
const {Product, Order, ProductOrder} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    const orderId = cart.id
    const productList = await ProductOrder.findAll({
      where: {
        orderId: orderId
      },
      include: [{model: Product, as: 'product'}]
    })
    res.json(productList)
  } catch (error) {
    next(error)
  }
})

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
    //find the corresponding product-order
    const currentProductOrder = await ProductOrder.findOne({
      where: {orderId: currentOrder.id, productId: req.body.productId}
    })

    //check to see if the current order has this kind of product before
    if (!currentProductOrder) {
      //adding current product to the current order
      const currentProduct = await Product.findOne({
        where: {id: req.body.productId},
        include: [{model: ProductOrder}]
      })
      await currentOrder.addProduct(currentProduct)
    } else {
      currentProductOrder.quantity++
      currentProductOrder.save()
    }

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId
      }
    })
    const orderId = orderId.id
    const productOrder = await ProductOrder.findOne({
      where: {
        orderId: orderId,
        productId: req.body.productId
      }
    })
    if (req.body.method === 'increment') {
      productOrder.quantity++
      productOrder.save()
    }
    if (req.body.method === 'decrement') {
      if (productOrder.quantity > 1) {
        productOrder.quantity--
        productOrder.save()
      } else {
        productOrder.destroy()
      }
    }
  } catch (error) {
    next(error)
  }
})
