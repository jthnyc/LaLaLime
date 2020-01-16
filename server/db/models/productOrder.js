const Sequelize = require('sequelize')

const db = require('../db')

const ProductOrder = db.define('productOrder', {
  productId: {
    type: Sequelize.STRING
  },
  orderId: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrder
