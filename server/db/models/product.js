const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  SKU: {
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
    type: Sequelize.STRING,
    defaultValue:
      'https://athleta.gap.com/webcontent/0018/263/970/cn18263970.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'Badass clothes'
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
