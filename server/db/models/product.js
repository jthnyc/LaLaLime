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
    //store as pennies
    type: Sequelize.INTEGER,
    min: 0,
    max: 100
  },
  inventory: {
    type: Sequelize.INTEGER,
    min: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://athleta.gap.com/webcontent/0018/263/970/cn18263970.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
