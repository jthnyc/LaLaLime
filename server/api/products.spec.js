/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({
        SKU: '12345679',
        name: 'legging1',
        color: 'black',
        size: 's',
        price: 30,
        quantity: 10,
        category: 'leggings'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      console.log('res body', res.body)
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].name).to.be.equal('legging1')
    })
  })

  describe('/api/products/:SKU/', async () => {
    beforeEach(() => {
      return Product.create({
        SKU: '12345679',
        name: 'legging1',
        color: 'black',
        size: 's',
        price: 30,
        quantity: 10,
        category: 'leggings'
      })
    })

    it('gets the product(s) with the specified id', async () => {
      const res = await request(app)
        .get('/api/products/12345679')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].name).to.be.equal('legging1')
    })
  })
})
