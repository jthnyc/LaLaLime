import React from 'react'

const CartItem = props => {
  const {key, item, increment, decrement, remove} = props
  return (
    <div key={item.id} className="cart-list">
      <div className="cart-product-row">
        <img
          src="https://cdn.shopify.com/s/files/1/2185/2813/products/W5824R_03093R_1_8f37f807-0efa-4472-b478-6c353a5b5670.jpg?v=1578621956"
          width="100"
          height="120"
        />
      </div>
      <div className="cart-product-detail">
        <div>{item.name}</div>
        <div>SKU: {item.SKU}</div>
        <div>Color: {item.color}</div>
        <div>Size: {item.size}</div>
        <div>Price: ${item.price}</div>
        <div className="quantity-btn">
          <button type="button" onClick={cartItem => decrement(cartItem)}>
            -
          </button>
          <p>1</p>
          <button type="button" onClick={cartItem => increment(cartItem)}>
            +
          </button>
        </div>
        <div>
          <button type="button">Edit</button>
        </div>
        <div>
          <button type="button" onClick={cartItem => remove(cartItem)}>
            X
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
