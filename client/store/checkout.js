import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDER_ITEMS = 'GOT_ORDER_ITEMS'

/**
 * INITIAL STATE
 */
const initialState = {
  orderItems: []
}

/**
 * ACTION CREATORS
 */

const gotOrderItems = orderItems => ({
  type: GOT_ORDER_ITEMS,
  orderItems
})

/**
 * THUNK CREATORS
 */
export const getOrderItems = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${userId}/checkout`)
    dispatch(gotOrderItems(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER_ITEMS:
      return {...state, orderItems: [...action.orderItems]}
    default:
      return state
  }
}
