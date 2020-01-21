import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'

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
//at single product view when adding to cart
export const addProductToCart = (userId, productId) => async dispatch => {
  try {
    await axios.post(`/api/cart/${userId}`, {
      productId: productId
    })
    dispatch(getCartItems(userId))
  } catch (error) {
    console.error(error)
  }
}

//at cart view
export const deleteProductFromCart = (userId, productId) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${userId}`, {
      data: {
        userId: userId,
        productId: productId
      }
    })
    dispatch(getCartItems(userId))
  } catch (error) {
    console.error(error)
  }
}

export const incrementItemQuantity = (userId, productId) => async dispatch => {
  try {
    await axios.put(`/api/cart/${userId}`, {
      productId: productId,
      change: 'increment'
    })
    dispatch(getCartItems(userId))
  } catch (error) {
    console.error(error)
  }
}

export const decrementItemQuantity = (userId, productId) => async dispatch => {
  try {
    await axios.put(`/api/cart/${userId}`, {
      productId: productId,
      change: 'decrement'
    })
    dispatch(getCartItems(userId))
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
    default:
      return state
  }
}
