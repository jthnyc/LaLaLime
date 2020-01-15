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
                      <button type="button">-</button>
                      <p>1</p>
                      <button type="button">+</button>
                    </div>
                    <div>
                      <button type="button">Edit</button>
                    </div>
                    <div>
                      <button type="button" onClick={this.removeFromCart}>
                        X
                      </button>
                    </div>
                  </div>
                </div>
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
