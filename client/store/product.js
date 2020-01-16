import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  currentProduct: []
}

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({
  type: GOT_PRODUCTS,
  products
})
const gotSingleProduct = currentProduct => ({
  type: GOT_SINGLE_PRODUCT,
  currentProduct
})
const addedProductToCart = productId => ({
  type: ADD_PRODUCT_TO_CART,
  productId
})

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const addProductToCart = (userId, productId) => async dispatch => {
  try {
    console.log('addProdToCart')
    const res = await axios.post('/api/cart/order', {
      userId: userId,
      productId: productId
    })
    dispatch(addedProductToCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, products: action.products}
    case GOT_SINGLE_PRODUCT:
      return {...state, currentProduct: action.currentProduct}
    case ADD_PRODUCT_TO_CART:
      return {...state, currentProduct: action.productId}
    default:
      return state
  }
}
