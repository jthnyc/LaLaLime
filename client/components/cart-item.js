import React from 'react'
import {Link} from 'react-router-dom'
import {
  deleteProductFromCart,
  incrementItemQuantity,
  decrementItemQuantity
} from '../store'
import {connect} from 'react-redux'

const CartItem = props => {
  const {item, userId} = props
  return (
    <div key={item.id} className="cart-item">
      <div className="cart-item-image">
        <img src={item.product.imageUrl} width="100" height="120" />
      </div>
      <div className="cart-item-detail">
        <Link to={`/products/${item.product.id}`}>
          <b>{item.product.name}</b>
        </Link>
        <div>SKU: {item.product.SKU}</div>
        <div>Color: {item.product.color}</div>
        <div>Size: {item.product.size}</div>
        <b>${item.product.price}</b>
      </div>
      <div className="cart-action-wrapper">
        <button
          type="button"
          className="quantity-btn"
          onClick={() => props.decrement(userId, item.productId)}
        >
          -
        </button>
        <input
          type="number"
          className="item-quantity"
          min="1"
          step="1"
          value={item.quantity}
          readOnly
        />
        <button
          type="button"
          className="quantity-btn"
          onClick={() => props.increment(userId, item.productId)}
        >
          +
        </button>
      </div>
      <div>
        <button
          className="cart-item-remove-btn"
          type="button"
          onClick={() => props.removeItem(userId, item.productId)}
        >
          X
        </button>
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
