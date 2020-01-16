import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'
const INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY'
const DECREMENT_ITEM_QUANTITY = 'DECREMENT_ITEM_QUANTITY'

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

const incrementedItemQuantity = productId => ({
  type: INCREMENT_ITEM_QUANTITY,
  productId
})

const decrementedItemQuantity = productId => ({
  type: DECREMENT_ITEM_QUANTITY,
  productId
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

export const deleteProductFromCart = user => async dispatch => {
  try {
    console.log('USERID IN DELETE: ', user)
    let productList = initialState.cartItems
    let product
    console.log('PRODUCT IN DELETE: ', product)
    await axios.delete(`/api/cart/${user}`)
    const {data} = await axios.get(`/api/cart/${user}`)
    dispatch(deletedProductFromCart(data))
  } catch (error) {
    console.error(error)
  }
}

// export const incrementItemQuantity = (productId) => async dispatch => {
//   try {

//   } catch (error) {
//     console.error(error)
//   }
// }

// export const decrementItemQuantity = (productId) => async dispatch => {
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
      return {...state, cartItems: action.cartItems}
    case DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.id != action.cartItems.id
        )
      }
    default:
      return state
  }
}
