import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const ADDED_NEW_ITEM_TO_CART = 'ADDED_NEW_ITEM_TO_CART'
const UPDATED_QUANTITY = 'UPDATED_QUANTITY'

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

const addedNewItemToCart = productOrder => ({
  type: ADDED_NEW_ITEM_TO_CART,
  productOrder
})

const updatedQuantity = productOrder => ({
  type: UPDATED_QUANTITY,
  productOrder
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
    const productOrder = await axios.post(`/api/cart/${userId}`, {
      productId: productId
    })
    console.log('DATA IN CART: ', productOrder.data)
    if (productOrder.data.quantity === 1) {
      dispatch(addedNewItemToCart(productOrder.data))
    } else {
      dispatch(updatedQuantity(productOrder.data))
    }
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
    const productOrder = await axios.put(`/api/cart/${userId}`, {
      productId: productId,
      change: 'increment'
    })
    console.log('productOrder inside incrementThunk', productOrder)
    dispatch(changedQuantity(productOrder.data))
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
    case ADDED_NEW_ITEM_TO_CART:
      return {...state, cartItems: [...state.cartItems, action.productOrder]}
    case UPDATED_QUANTITY:
      return {...state, cartItems: [...state.cartItems, action.productOrder]}
    default:
      return state
  }
}
