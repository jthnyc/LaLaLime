/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const ProductOrder = db.model('productOrder')

describe('ProductOrder model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let productOrder

  beforeEach(async () => {
    productOrder = await ProductOrder.create({
      orderId: 1,
      productId: 1,
      quantity: 2
    })
  })

  describe('productOrder attributes', () => {
    it('includes `orderId`, `productId`, `quantity` fields', () => {
      expect(productOrder.orderId).to.equal(1)
      expect(productOrder.productId).to.equal(1)
      expect(productOrder.quantity).to.equal(2)
    })

    it('requires `orderId`', async () => {
      productOrder.orderId = null

      let result, error
      try {
        result = await productOrder.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when content is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `productId`', async () => {
      productOrder.productId = null

      let result, error
      try {
        result = await productOrder.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when name is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `quantity`', async () => {
      productOrder.quantity = null

      let result, error
      try {
        result = await producOrder.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when description is null')

      expect(error).to.be.an.instanceOf(Error)
    })
  })
}) // end describe('User model')
