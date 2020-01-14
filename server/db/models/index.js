const User = require('./user')
const Product = require('./product')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {
  through: 'ProductOrders',
  as: 'orders',
  foreignKey: 'productId'
})
Order.belongsToMany(Product, {
  through: 'ProductOrders',
  as: 'products',
  foreignKey: 'orderId'
})

module.exports = {
  User,
  Product,
  Order
}
