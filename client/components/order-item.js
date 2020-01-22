import React from 'react'

const OrderItem = props => {
  const {item} = props
  return (
    <div key={item.id} className="cart-item">
      <div className="cart-item-row">
        <img src={item.product.imageUrl} width="100" height="120" />
        <div className="cart-item-detail">
          <a href={`/products/${item.id}`}>
            <b>{item.product.name}</b>
          </a>
          <div>SKU: {item.product.SKU}</div>
          <div>Color: {item.product.color}</div>
          <div>Size: {item.product.size}</div>
          <b>${item.product.price}</b>
        </div>
        <div className="quantity-wrapper">
          <div>quantity: {item.quantity}</div>
        </div>
      </div>
    </div>
  )
}
export default OrderItem
