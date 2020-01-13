const router = require('express').Router()
const {Category, Legging} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Category.findAll({
      include: [
        {
          model: Legging,
          // as: 'products',
          attributes: ['id', 'name', 'imageUrl']
        }
      ]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})
