import React from 'react'
import CartItem from './cart-item'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cartItems: [],
      outOfStock: false
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  increment(item) {
    const max = 10
    if (item.quantity < max) {
      item.quantity++
    } else {
      this.setState({
        outOfStock: true
      })
      alert('Womp womp... no more...')
    }
  }

  decrement(item) {
    if (item.quantity >= 1) {
      item.quantity--
    }
    if (item.quantity === 0) {
      this.removeFromCart(item)
    }
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
          {this.cartItems ? (
            this.cartItems.map(item => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  increment={this.increment}
                  decrement={this.decrement}
                  remove={this.removeFromCart}
                />
              )
            })
          ) : (
            <div>No items in cart!</div>
          )}
        </div>
      </div>
    )
  }
}

export default Cart
