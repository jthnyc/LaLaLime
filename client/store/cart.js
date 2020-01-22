import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const ADDED_NEW_ITEM_TO_CART = 'ADDED_NEW_ITEM_TO_CART'
const UPDATED_QUANTITY = 'UPDATED_QUANTITY'
const DELETED_PRODUCT_FROM_CART = 'DELETED_PRODUCT_FROM_CART'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

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

const deletedProductFromCart = productId => ({
  type: DELETED_PRODUCT_FROM_CART,
  productId
})

const updatedOrderStatus = () => ({
  type: UPDATE_ORDER_STATUS
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
    if (productOrder.data.quantity === 1) {
      dispatch(addedNewItemToCart(productOrder.data))
    } else {
      dispatch(updatedQuantity(productOrder.data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateOrderStatus = (userId, order) => async dispatch => {
  try {
    console.log('DO WE GET HEREEEEEE????')
    await axios.put(`/api/cart/order/${userId}`, order)
    dispatch(updatedOrderStatus())
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
    dispatch(deletedProductFromCart(productId))
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
    dispatch(updatedQuantity(productOrder.data))
  } catch (error) {
    console.error(error)
  }
}

export const decrementItemQuantity = (userId, productId) => async dispatch => {
  try {
    const productOrder = await axios.put(`/api/cart/${userId}`, {
      productId: productId,
      change: 'decrement'
    })
    if (productOrder.data === 'Accepted') {
      dispatch(deletedProductFromCart(productId))
    } else {
      dispatch(updatedQuantity(productOrder.data))
    }
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
      return {
        ...state,
        cartItems: state.cartItems.map(el => {
          if (el.productId !== action.productOrder.productId) {
            return el
          } else {
            const newEl = action.productOrder
            return newEl
          }
        })
      }
    case DELETED_PRODUCT_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          el => el.productId !== action.productId
        )
      }
    default:
      return state
  }
}
