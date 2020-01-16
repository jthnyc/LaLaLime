import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'
// const INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY'
// const DECREMENT_ITEM_QUANTITY = 'DECREMENT_ITEM_QUANTITY'

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

const deletedProductFromCart = updatedCart => ({
  type: DELETE_PRODUCT_FROM_CART,
  cartItems: updatedCart
})

// const incrementedItemQuantity = productId => ({
//   type: INCREMENT_ITEM_QUANTITY,
//   productId
// })

// const decrementedItemQuantity = productId => ({
//   type: DECREMENT_ITEM_QUANTITY,
//   productId
// })

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
      userId: userId,
      productId: productId
    })

    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(deletedProductFromCart(data))
  } catch (error) {
    console.error(error)
  }
}

// export const incrementItemQuantity = (userId, product) => async dispatch => {
//   try {
//     const updatedProduct = await axios.put(`/api/cart/${userId}`, product)
//     dispatch(incrementedItemQuantity(updatedProduct))
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const decrementItemQuantity = (userId, productId) => async dispatch => {
//   try {
//   } catch (error) {
//     console.error(error)
//   }
// }

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CART_ITEMS:
      return {...state, cartItems: [...action.cartItems]}
    case DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        cartItems: [...action.cartItems]
      }
    default:
      return state
  }
}
