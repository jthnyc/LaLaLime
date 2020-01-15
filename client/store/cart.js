import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'

/**
 * INITIAL STATE
 */
const cartItems = {
  cartItems: []
}

/**
 * ACTION CREATORS
 */
const gotCartItems = cartItems => ({
  type: GOT_CART_ITEMS
})

/**
 * THUNK CREATORS
 */
export const getCartItems = () => async dispatch => {
  try {
    // NEED TO FIX API ROUTE
    const {data} = await axios.get('/api/products')
    dispatch(gotCartItems(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = cartItems, action) {
  switch (action.type) {
    case GOT_CART_ITEMS:
      return {...state, cartItems: action.cartItems}
    default:
      return state
  }
}
