const router = require('express').Router()
const {Category, Legging, Bra} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const leggings = await Legging.findAll({
      include: [
        {
          model: Category,
          attributes: ['type']
        }
      ]
    })
    const bras = await Bra.findAll({
      include: [{model: Category}]
    })
    res.json([...leggings, ...bras])
  } catch (error) {
    next(error)
  }
})
