/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const ProductOrder = db.model('productOrder')
const Order = db.model('order')
const Product = db.model('product')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // let order
  // let product

  describe('/api/cart/:userId', async () => {
    beforeEach(() => {
      // product = await Product.create({
      //   id: 1,
      //   SKU: '12345679',
      //   name: 'legging1',
      //   color: 'black',
      //   size: 's',
      //   price: 30,
      //   quantity: 10,
      //   category: 'leggings'
      // })

      // order = await Order.create({
      //   id: 1,
      //   status: 'pending',
      //   date: '01-01-2000',
      //   firstName: 'Lizzo',
      //   lastName: 'Einstein',
      //   address: '5 Hanover Square',
      //   cardInfo: 424242424242
      // })

      return ProductOrder.create({
        orderId: order.id,
        productId: product.id,
        quantity: 2
      })
    })
    it('gets the product(s) with the specified user id', async () => {
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].quantity).to.be.equal(2)
    })
  })
})
