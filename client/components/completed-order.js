import React from 'react'

const CompletedOrder = props => {
  const order = props.order

  return (
    <div className="completed-order">
      <div>Order number: {order.id}</div>
      <div>Placed on: {order.updatedAt.slice(0, 10)}</div>
      <div>
        Recipient: {order.firstName} {order.lastName}
      </div>
      <div>Address: {order.address}</div>
    </div>
  )
}

export default CompletedOrder
/**
 * CONTAINER
 */
