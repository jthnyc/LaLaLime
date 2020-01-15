import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_PRODUCT_TO_STATE = 'ADD_PRODUCT_TO_STATE'

/**
 * INITIAL STATE
 */
const initialState = {
  currentUser: {},
  currentProduct: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addProductToState = productId => ({type: ADD_PRODUCT_TO_STATE, productId})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.currentUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addProductToOrder = (userId, productId) => async dispatch => {
  try {
    console.log('addProdToOrder')
    const res = await axios.post('/api/users/order', {
      userId: userId,
      productId: productId
    })
    dispatch(addProductToState(productId))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, currentUser: action.user}
    case REMOVE_USER:
      return initialState
    case ADD_PRODUCT_TO_STATE:
      return {...state, currentProduct: action.productId}
    default:
      return state
  }
}
