/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  before(() => {
    return db.sync({force: true})
  })

  let order

  beforeEach(async () => {
    order = await Order.create({
      status: 'pending',
      date: '01-01-2000',
      firstName: 'Lizzo',
      lastName: 'Einstein',
      address: '5 Hanover Square',
      cardInfo: 424242424242
    })
  })

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('order attributes', () => {
    it('includes `status`, `firstName`, `lastName`, `address` fields', () => {
      expect(order.status).to.equal('pending')
      expect(order.firstName).to.equal('Lizzo')
      expect(order.lastName).to.equal('Einstein')
      expect(order.address).to.equal('5 Hanover Square')
    })

    it('requires `status`', async () => {
      order.status = null

      let result, error
      try {
        result = await order.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when content is null')

      expect(error).to.be.an.instanceOf(Error)
    })
  })
}) // end describe('Order model')
