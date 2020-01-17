import React from 'react'
import {
  deleteProductFromCart,
  incrementItemQuantity,
  decrementItemQuantity
} from '../store'
import {connect} from 'react-redux'

const CartItem = props => {
  const {item, userId} = props
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
          <button
            type="button"
            onClick={() => props.decrement(userId, item.productId)}
          >
            -
          </button>
          <p>{item.quantity}</p>
          <button
            type="button"
            onClick={() => props.increment(userId, item.productId)}
          >
            +
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => props.removeItem(userId, item.productId)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    removeItem: (userId, productId) =>
      dispatch(deleteProductFromCart(userId, productId)),
    increment: (userId, productId) =>
      dispatch(incrementItemQuantity(userId, productId)),
    decrement: (userId, productId) =>
      dispatch(decrementItemQuantity(userId, productId))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
