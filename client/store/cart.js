import axios from 'axios'
import product from './product'

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
    console.log('DATA IN THUNK: ', data)
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
    dispatch(gotCartItems(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteProductFromCart = (userId, productId) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${userId}`, {
      data: {
        userId: userId,
        productId: productId
      }
    })
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCartItems(data))
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
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCartItems(data))
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
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(gotCartItems(data))
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
