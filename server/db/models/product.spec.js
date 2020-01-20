/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  before(() => {
    return db.sync({force: true})
  })

  let product

  beforeEach(() => {
    product = Product.create({
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

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('product attributes', () => {
    it('includes `SKU`, `name`, `color`, `size`, `price`, `inventory`, `imageUrl`, `description`, `category` fields', async () => {
      const savedProduct = await product.save()
      expect(savedProduct.SKU).to.equal('12345679')
      expect(savedProduct.name).to.equal('legging1')
      expect(savedProduct.color).to.equal('black')
      expect(savedProduct.size).to.equal('s')
      expect(savedProduct.price).to.equal(30)
      expect(savedProduct.quantity).to.equal(10)
      expect(savedProduct.category).to.equal('leggings')
    })

    it('requires `SKU``', async () => {
      product.SKU = null

      let result, error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when content is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `name`', async () => {
      product.name = null

      let result, error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when name is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `description`', async () => {
      product.description = null

      let result, error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when description is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `category`', async () => {
      product.category = null

      let result, error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when category is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    // it('can handle long description', async () => {
    //   let productDescription =
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    //   const result = await Product.create({
    //     SKU: '12345679',
    //     name: 'legging1',
    //     description: productDescription,
    //     cateogry: 'leggings'
    //   })

    //   expect(result).to.be.an('object')
    //   expect(result.SKU).to.equal('12345679')
    //   expect(result.description).to.equal(productDescription)
    //   expect(result.category).to.equal('leggings')
    // })
  })
}) // end describe('User model')
