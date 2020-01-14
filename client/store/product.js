import axios from 'axios'
import singleProduct from '../components/single-product'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

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
const gotSingleProduct = product => ({
  type: GOT_PRODUCTS,
  currentProduct: product
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

export const getSingleProduct = SKU => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/:SKU')
    dispatch(gotSingleProduct(data))
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
    default:
      return state
  }
}
