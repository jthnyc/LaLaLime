import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_LEGGINGS = 'GOT_LEGGINGS'
const GOT_SINGLE_LEGGING = 'GOT_SINGLE_LEGGING'

/**
 * INITIAL STATE
 */
const leggings = {
  leggings: [],
  singleLegging: {}
}

/**
 * ACTION CREATORS
 */
const gotLeggings = () => ({type: GOT_LEGGINGS})
const gotSingleLegging = singleLegging => ({
  type: GOT_SINGLE_LEGGING,
  singleProduct: singleLegging
})

/**
 * THUNK CREATORS
 */
export const getLeggings = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/leggings')
    dispatch(gotLeggings(data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleLegging = singleProduct => async dispatch => {
  try {
    const {data} = await axios.get(`/api/leggings/${singleProduct}`)
    dispatch(gotSingleLegging(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = leggings, action) {
  switch (action.type) {
    case GOT_LEGGINGS:
      return {...state, leggings: action.leggings}
    case GOT_SINGLE_LEGGING:
      return {...state, singleLegging: action.singleLegging}
    default:
      return state
  }
}
