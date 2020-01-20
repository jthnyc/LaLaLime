/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    beforeEach(() => {
      return Product.create({
        SKU: '12345679',
        name: 'legging1',
        color: 'black',
        size: 's',
        price: 30,
        inventory: 10,
        imageUrl:
          'https://athleta.gap.com/webcontent/0018/263/970/cn18263970.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'leggings'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].name).to.be.equal('legging1')
    })
  })

  describe('/api/products/:SKU', () => {
    let bestProduct

    beforeEach(async () => {
      const creatingProducts = [
        {
          SKU: '12345679',
          name: 'legging1',
          color: 'black',
          size: 's',
          price: 30,
          quantity: 10,
          category: 'leggings'
        },
        {
          SKU: '12345680',
          name: 'legging2',
          color: 'black',
          size: 'm',
          price: 30,
          quantity: 10,
          category: 'leggings'
        },
        {
          SKU: '12345681',
          name: 'legging3',
          color: 'black',
          size: 'l',
          price: 30,
          quantity: 10,
          category: 'leggings'
        }
      ].map(data => Product.create(data))

      const createdProducts = await Promise.all(creatingProducts)
      bestProduct = createdProducts[1]
    })

    it('gets the product(s) with the specified id', async () => {
      const res = await agent.get('/api/products/1').expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.id).to.equal(1)
      expect(res.body.name).to.equal('legging1')
    })

    // it('returns a 404 error if the SKU is not correct', () => {
    //   return agent.get('/api/products/100').expect(404)
    // })
  })
})
