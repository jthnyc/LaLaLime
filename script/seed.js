'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const orders = await Promise.all([
    Order.create({
      status: 'pending',
      date: '2020-01-15',
      firstName: 'Lala',
      lastName: 'Lime',
      address: '27 Lime St',
      cardInfo: '5105105105105100'
    }),
    Order.create({
      status: 'processed',
      date: '2020-01-13',
      firstName: 'Lolo',
      lastName: 'Orange',
      address: '35 Orange St',
      cardInfo: '4012888888881881'
    })
  ])

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'cercle@email.com', password: '123'})
  ])

  const products = await Promise.all([
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
    }),
    Product.create({
      SKU: '10102001',
      name: 'Chelsea Utility Jogger',
      color: 'Brown',
      size: 'S',
      price: 90,
      inventory: 10,
      category: 'leggings',
      imageUrl:
        'https://athleta.gap.com/webcontent/0018/293/091/cn18293091.jpg',
      description:
        'Semi-fitted, skims easily over the body with a mid-rise waistband \nFeatures: 6 pockets, Sustainable, Abrasion-resistant \nMaterial: Recycled Polyester/Spandex'
    }),
    Product.create({
      SKU: '10103001',
      name: 'Sutton Jogger',
      color: 'Gray',
      size: 's',
      price: 90,
      inventory: 10,
      category: 'leggings',
      imageUrl:
        'https://athleta.gap.com/webcontent/0016/857/860/cn16857860.jpg',
      description:
        'Semi-fitted, Mid-rise \nSits below the natural waist \nKnit cuffs for extra comfort and mobility \nFeatures: 2 front zip pockets, 2 cargo pockets and 2 back pockets secure essentials \nMaterial: Recycled Polyester/Spandex \nCare: Machine wash and line dry.'
    }),
    Product.create({
      SKU: '10101002',
      name: 'Chelsea Cargo Pant',
      color: 'Black',
      size: 'S',
      price: 100,
      inventory: 20,
      category: 'leggings',
      imageUrl:
        'https://athleta.gap.com/webcontent/0017/065/000/cn17065000.jpg',
      description:
        'Semi-fitted, Mid-rise, Tapered leg \nGreat for commuting, work and travel \n6 pockets stash all your essentials \nFeatures: Wrinkle-resistant, Breathable, Quick-drying \nMaterial: Recycled Polyester/Spandex \nCare: Machine wash and dry.'
    }),
    Product.create({
      SKU: '10104001',
      name: 'Elation Tie Dye 7/8 Tight',
      color: 'Coral',
      size: 'S',
      price: 100,
      inventory: 25,
      category: 'leggings',
      imageUrl:
        'https://athleta.gap.com/webcontent/0018/208/996/cn18208996.jpg',
      description:
        'Fitted next to the body with an ultra high-rise waistband that holds you in \nGreat for yoga \nFabric feels smooth and compressive on body\nFeatures: Moisture-wicking, Breathable \nMaterial: Polyester/Lycra \nCare: Machine wash and dry.'
    }),
    Product.create({
      SKU: '10205001',
      name: 'Lightning 7/8 Tight',
      color: 'Burgundy',
      size: 'M',
      price: 100,
      inventory: 10,
      category: 'leggings',
      imageUrl:
        'https://athleta.gap.com/webcontent/0017/308/223/cn17308223.jpg',
      description:
        'Fitted, High-rise \nGreat for long distance, short distance and trail running \nHybrid design with lightweight, breathable panels on lower leg \nFeatures: Sustainable, Moisture-wicking, Breathable, Quick-drying, Fair Trade \nMaterial: Recycled Nylon/Spandex \nCare: Machine wash and dry.'
    }),
    Product.create({
      SKU: '10206001',
      name: 'Salutation Pocket Twist',
      color: 'Russet Brown',
      size: 'M',
      price: 110,
      inventory: 10,
      category: 'leggings',
      imageUrl:
        'https://athleta.gap.com/webcontent/0018/236/740/cn18236740.jpg',
      description:
        'Fitted next to the body, with a high rise waistband that holds you in \nGreat for yoga \nFeatures: Side pocket, Moisture-wicking, Breathable, Quick-drying \nMaterial: Recycled Polyester/Spandex \nCare: Machine wash and dry.'
    }),
    Product.create({
      SKU: '10302002',
      name: 'Sheer Will High Rise Tight',
      color: 'Gray',
      size: 'L',
      price: 150,
      inventory: 10,
      category: 'leggings',
      imageUrl:
        'https://images.lululemon.com/is/image/lululemon/LW5CESS_036666_1?$pdp_image_carousel$&wid=1280&op_usm=0.5,2,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
      description:
        'Fitted, High-rise \nGreat for yoga \nFeature: Stash Pocket, Moisture-wicking, Quick-drying \nMaterial: Recycled Nylon/Lycra \nCare: Machine wash cold and tumble dry low.'
    }),
    Product.create({
      SKU: '10302003',
      name: 'Wunder Under High-Rise Tight',
      color: 'Gray',
      size: 'L',
      price: 100,
      inventory: 10,
      category: 'leggings',
      imageUrl:
        'https://images.lululemon.com/is/image/lululemon/LW5CE5S_042134_1?$pdp_image_carousel$&wid=1280&op_usm=0.5,2,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
      description:
        "Fitted, High-rise \nWaistband lies flat and won't dig in \nFeature: Waistband pocket, Moisture-wicking, Breathable, Four-way stretch \nMaterial: Recycled Nylon/Lycra \nCare: Machine wash cold and tumble dry low."
    }),
    Product.create({
      SKU: '10107001',
      name: 'High-Rise Sequence Legging',
      color: 'Blue',
      size: 'S',
      price: 130,
      inventory: 20,
      category: 'leggings',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2185/2813/products/W5775R_02951_1.jpg?v=1575956195',
      description:
        'Second-skin feel, 4-way-stretch fabric for a move-with-you feel \nFeatures: Moisture-wicking, Breathable \nMaterial: Signature Airlift fabric'
    }),
    Product.create({
      SKU: '10202004',
      name: 'High-rise Ripped Warrior Legging',
      color: 'Concrete',
      size: 'M',
      price: 125,
      inventory: 15,
      category: 'leggings',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2185/2813/products/W5555R_02550_1_3182126b-4bb0-4d15-8cb6-4a2a36a5b5f6.jpg?v=1571609459',
      description:
        'Engineered to lift, sculpt, contour and smooth \n4-way-stretch fabric for a move-with-you feel \nFeatures: Moisture-wicking, Breathable \nMaterial: Signature Airbrush fabric'
    }),
    Product.create({
      SKU: '10301003',
      name: 'High-rise Coast Capri',
      color: 'Black',
      size: 'L',
      price: 95,
      inventory: 20,
      category: 'leggings',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2185/2813/products/W5521R_01_2.jpg?v=1575220584',
      description:
        'Engineered to lift, sculpt, contour and smooth \n4-way-stretch fabric for a move-with-you feel \nBreathable mesh detail \nFeatures: Moisture-wicking, Breathable \nMaterial: Ultimate Performance Nylon Spandex + Micro Mesh'
    })
  ])
  const productOrder = await Promise.all([
    ProductOrder.create({productId: '1', orderId: '1', quantity: 1}),
    ProductOrder.create({productId: '2', orderId: '1', quantity: 2})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${productOrder.length} product orders`)
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
