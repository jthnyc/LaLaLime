const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['pending', 'processed']]
    }
  },
  date: {
    type: Sequelize.DATE,
    isDate: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  cardInfo: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isCreditCard: true,
    //   len: [16]
    // }
  }
})

module.exports = Order
