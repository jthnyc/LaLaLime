const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.use('*', (req, res, next) => {
  try {
    let paramId = Number(req.params['0'].slice(1))

    if (req.session.user.id === paramId) {
      next()
    } else {
      // res.set('location', `../${req.session.user.id}`)
      res.status(403).redirect(`/${req.session.user.id}`)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/', async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      where: {
        id: req.body.orderId
      }
    })
    currentOrder.firstName = req.body.firstName
    currentOrder.lastName = req.body.lastName
    currentOrder.address = req.body.address
    currentOrder.zipcode = req.body.zipcode
    currentOrder.city = req.body.city
    currentOrder.email = req.body.email
    currentOrder.phone = req.body.phone
    currentOrder.status = 'processed'
    currentOrder.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
