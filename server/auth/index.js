const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.user.id
      }
    })
    user.password = req.body.password
    user.email = req.body.email
    user.save()
    req.login(user, err => (err ? next(err) : res.status(201).json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  let userWithOrders
  if (req.user) {
    userWithOrders = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [
        {
          model: Order,
          where: {
            status: 'processed'
          }
        }
      ]
    })
    userWithOrders ? res.json(userWithOrders) : res.json(req.user)
  } else {
    res.json(req.session.user)
  }
})

router.use('/google', require('./google'))
