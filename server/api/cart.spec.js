/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/:userId', () => {
    beforeEach(() => {
      return [
        Product.create({
          SKU: '10101001',
          name: 'Salutation Stash Pocket II',
          color: 'Black',
          size: 'S',
          price: 100,
          inventory: 30,
          category: 'leggings',
          imageUrl:
            'https://athleta.gap.com/webcontent/0018/236/777/cn18236777.jpg',
          description:
            'Fabric is buttery soft with support that feels like a gentle hug.\n Dries in a flash for ultimate comfort when breaking a sweat \nFeatures: Side pocket, Moisture-wicking, Breathable, Quick-drying \nMaterial: Nylon/Lycra \nCare: Machine wash and dry.'
        })
      ]
    })
    it('gets the product(s) with the specified user id', async () => {
      const res = await request(app)
        .get('/api/cart/1')
        .expect(200)

      expect(res.body).to.be.an('array')
      // expect(res.body.length).to.be.equal(2)
    })
  })
})
