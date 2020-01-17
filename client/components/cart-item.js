import React from 'react'

const CartItem = props => {
  const {item, increment, decrement, removeItem, userId} = props
  return (
    <div key={item.id} className="cart-list">
      <div className="cart-product-row">
        <img src={item.product.imageUrl} width="100" height="120" />
      </div>
      <div className="cart-product-detail">
        <div>{item.product.name}</div>
        <div>SKU: {item.product.SKU}</div>
        <div>Color: {item.product.color}</div>
        <div>Size: {item.product.size}</div>
        <div>Price: ${item.product.price}</div>
        <div className="quantity-btn">
          <button type="button" onClick={() => decrement(item.quantity)}>
            -
          </button>
          <p>{item.quantity}</p>
          <button type="button" onClick={() => increment(item.quantity)}>
            +
          </button>
        </div>
        <div>
          <button
            type="button"
            productid={item.id}
            onClick={() => removeItem()}
          >
            X
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
