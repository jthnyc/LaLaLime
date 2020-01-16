const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id: id
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

//when a guess browse a page, server look at the session/cookie id, and findOrCreate a user

// router.post('/', async (req, res, next) => {
//   try {
//     const user = await User.create({
//       email: `${req.session.id}@email.com`,
//       sessionId: `${req.session.id}`
//     })
//     res.json(user)
//   } catch (error) {
//     next(error)
//   }
// })
