import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CompletedOrder from './completed-order'
import RecentItem from './recent-item'
import {Redirect} from 'react-router'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, orders, currentItem} = props
  console.log('props in userhome', props)
  if (!props.email) {
    return <Redirect to="/products" />
  } else {
    return (
      <div>
        <h1>Hi {email}!</h1>
        <h3>Welcome back...</h3>
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
          {props.currentItem.id ? (
            <div>
              Recently Viewed:
              <div>
                <RecentItem
                  key={props.currentItem.id}
                  item={props.currentItem}
                />
              </div>
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
    currentItem: state.product.currentProduct
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 * }
 */
UserHome.propTypes = {
  email: PropTypes.string
}
