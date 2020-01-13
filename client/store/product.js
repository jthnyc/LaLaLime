import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GET_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const products = {
  products: [],
  singleProduct: {}
}

/**
 * ACTION CREATORS
 */
const gotProducts = () => ({type: GOT_PRODUCTS})
const gotSingleProduct = singleProduct => ({
  type: GOT_SINGLE_PRODUCT,
  singleProduct
})

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/all')
    dispatch(gotProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleProduct = singleProduct => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${singleProduct}`)
    dispatch(gotSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = products, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, products: action.products}
    case GOT_SINGLE_PRODUCT:
      return {...state, singleProduct: action.singleProduct}
    default:
      return state
  }
}
