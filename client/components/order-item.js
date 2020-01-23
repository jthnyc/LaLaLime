import React from 'react'
import {Link} from 'react-router-dom'

const OrderItem = props => {
  const {item} = props
  return (
    <div key={item.id} className="cart-item-checkout">
      <div className="cart-item-row">
        <img
          className="cart-item-image"
          src={item.product.imageUrl}
          width="100"
          height="120"
        />
        <div className="cart-item-detail-checkout">
          <Link to={`/products/${item.product.id}`}>
            <b>{item.product.name}</b>
          </Link>
          <div>Color: {item.product.color}</div>
          <div>Size: {item.product.size}</div>
          <div>Quantity: {item.quantity}</div>
          <b>${item.product.price}</b>
        </div>
      </div>
    </div>
  )
}
export default OrderItem
