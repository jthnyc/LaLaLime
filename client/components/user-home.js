import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CompletedOrder from './completed-order'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, orders, recentlyViewed} = props

  if (props.orders) {
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h3>
          Past Orders:{' '}
          {orders.map(order => <CompletedOrder key={order.id} order={order} />)}
        </h3>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h3>
          {props.recentlyViewed.name ? (
            <div>
              Recently Viewed: <div>{props.recentlyViewed.name}</div>
              <img src={props.recentlyViewed.imageUrl} />
            </div>
          ) : (
            <div />
          )}
        </h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('STATE IN USER-HOME:', state)
  return {
    email: state.user.email,
    orders: state.user.orders,
    recentlyViewed: state.product.recentlyViewed
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
