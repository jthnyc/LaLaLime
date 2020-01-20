import React from 'react'

const CompletedOrder = props => {
  const order = props.order

  return (
    <div>
      <h3>Placed on: {order.date}</h3>
      <h3>Shipped to: {order.firstName + order.lastName}</h3>
      <h2>{order.address}</h2>
    </div>
  )
}

export default CompletedOrder
/**
 * CONTAINER
 */
