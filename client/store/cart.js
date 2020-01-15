import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
// const ADD_PRODUCT_TO_STATE = 'ADD_PRODUCT_TO_STATE'

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
// const addProductToState = productId => ({type: ADD_PRODUCT_TO_STATE, productId})

/**
 * THUNK CREATORS
 */
export const getCartItems = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotCartItems(data))
  } catch (error) {
    console.error(error)
  }
}

export const addProductToCart = (userId, productId) => async dispatch => {
  try {
    console.log('addProdToCart')
    const res = await axios.post('/api/users/order', {
      userId: userId,
      productId: productId
    })
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
    // case ADD_PRODUCT_TO_STATE:
    //   return {...state, currentProduct: action.productId}
    default:
      return state
  }
}
