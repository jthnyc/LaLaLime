import React from 'react'
import CartItem from './cart-item'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  addToCart(item) {
    const newItems = this.state.cartItems.slice()
    newItems.push(item)
    this.setState({
      cartItems: newItems
    })
  }

  removeFromCart(item) {
    const newItems = this.state.cartItems.slice()
    newItems.splice(newItems.indexOf(item))
    this.setState({
      cartItems: newItems
    })
  }

  render() {
    return (
      <div className="cart-page">
        <h2>Shopping cart</h2>
        <div className="cart-list">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
    )
  }
}

export default Cart
