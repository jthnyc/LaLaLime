const router = require('express').Router()
const {Product, Order, ProductOrder, User} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    //Check if user is logged in
    if (req.session.passport) {
      //Check if user is attempting to view their own cart
      if (req.session.passport.user == req.params.userId) {
        const cart = await Order.findOne({
          where: {
            userId: req.params.userId,
            status: 'pending'
          }
        })
        //check if an order was found
        if (cart) {
          const orderId = cart.id
          const productList = await ProductOrder.findAll({
            where: {
              orderId: orderId
            },
            include: [{model: Product, as: 'product'}]
          })
          console.log(productList)
          res.json(productList)
        } else {
          //if not, send string
          res.json('No items in cart!')
        }
      } else {
        //if not authorized, send string
        res.json('Forbidden')
      }
    } else {
      //if not signed in, check that session user id matches the cart being requested
      if (req.session.user.id == req.params.userId) {
        const cart = await Order.findOne({
          where: {
            userId: req.params.userId,
            status: 'pending'
          }
        })
        if (cart) {
          const orderId = cart.id
          const productList = await ProductOrder.findAll({
            where: {
              orderId: orderId
            },
            include: [{model: Product, as: 'product'}]
          })
          res.json(productList)
        } else {
          res.json('No items in cart!')
        }
      } else {
        res.json('Forbidden')
      }
    }
  } catch (error) {
    next(error)
  }
})

router.post('/order', async (req, res, next) => {
  try {
    console.log('USERID', req.body.userId)
    const existingOrder = await Order.findOne({
      where: {
        userId: req.body.userId,
        status: 'pending'
      }
    })
    let currentOrder
    //if the user does not have pending order, create a new order
    if (!existingOrder) {
      currentOrder = await Order.create()
      const currentUser = await User.findOne({
        where: {
          id: req.body.userId
        }
      })
      console.log('CURRENT USER', currentUser)
      console.log('CURRENT ORDER', currentOrder)
      currentUser.addOrder(currentOrder)
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
    const orderId = order.id
    const productOrder = await ProductOrder.findOne({
      where: {
        orderId: orderId,
        productId: req.body.productId
      }
    })
    if (req.body.change === 'increment') {
      productOrder.quantity++
      productOrder.save()
    }
    if (req.body.change === 'decrement') {
      if (productOrder.quantity > 1) {
        productOrder.quantity--
        productOrder.save()
      } else {
        productOrder.destroy()
      }
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    console.log('CERCLE HITS HERE')
    console.log('REQQQQ params', req.params)
    const currentOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })
    const currentProductOrder = await ProductOrder.findOne({
      where: {
        orderId: currentOrder.id,
        productId: req.params.productId
      }
    })
    await currentProductOrder.destroy()
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})
