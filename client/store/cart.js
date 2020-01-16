import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  cartItems: []
}

/**
 * ACTION CREATORS
 */
const gotCartItems = cartItems => ({
  type: GOT_CART_ITEMS,
  cartItems
})
const addedProductToCart = productId => ({
  type: ADD_PRODUCT_TO_CART,
  productId
})

/**
 * THUNK CREATORS
 */
export const getCartItems = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCartItems(data))
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
    case GOT_CART_ITEMS:
      return {...state, cartItems: action.cartItems}
    case ADD_PRODUCT_TO_CART:
      return {...state, currentProduct: action.productId}
    default:
      return state
  }
}
