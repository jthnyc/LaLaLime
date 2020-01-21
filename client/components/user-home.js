import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CompletedOrder from './completed-order'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, orders, currentProduct} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h3>
        {props.orders ? (
          <div>
            Order History:
            {props.orders.map(order => (
              <CompletedOrder key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div />
        )}
      </h3>
      <h3>
        Recently Viewed:
        <div>{props.recentlyViewed.name}</div>
        <div className="cart-item">
          <img src={props.recentlyViewed.imageUrl} />
        </div>
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('STATE IN USER-HOME:', state)
  return {
    email: state.user.email,
    orders: state.user.orders,
    recentlyViewed: state.product.currentProduct
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
