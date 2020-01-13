'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Legging} = require('../server/db/models/')
const {Category} = require('../server/db/models/')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const categories = await Promise.all([
    Category.create({type: 'legging'}),
    Category.create({type: 'bra'}),
    Category.create({type: 'shirt'})
  ])

  const leggings = await Promise.all([
    Legging.create({
      productId: '12345679',
      name: 'legging1',
      color: 'black',
      size: 's',
      price: 30,
      quantity: 10,
      categoryId: categories[0].id
    }),
    Legging.create({
      productId: '12345680',
      name: 'legging2',
      color: 'black',
      size: 's',
      price: 30,
      quantity: 10,
      categoryId: categories[0].id
    }),
    Legging.create({
      productId: '12345681',
      name: 'legging3',
      color: 'black',
      size: 's',
      price: 30,
      quantity: 10,
      categoryId: categories[0].id
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
