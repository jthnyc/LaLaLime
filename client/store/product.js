import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const products = {
  products: []
}

/**
 * ACTION CREATORS
 */
const gotProducts = () => ({type: GOT_PRODUCTS})

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
/**
 * REDUCER
 */
export default function(state = products, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}
