const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  lineId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    min: 0,
    max: 100
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
