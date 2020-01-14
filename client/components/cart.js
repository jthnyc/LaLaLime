import React from 'react'
// import { CartItem } from './cart-item'

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
      <div id="cart-page">
        <h2>Shopping cart</h2>
        <table>
          <tbody>
            {/* <CartItem /> */}
            <tr>
              <td>
                <img
                  src="https://cdn.shopify.com/s/files/1/2185/2813/products/W5824R_03093R_1_8f37f807-0efa-4472-b478-6c353a5b5670.jpg?v=1578621956"
                  width="100"
                  height="120"
                />
              </td>
              <td>Super Fast Tron Leggings</td>
              <td>$20</td>
              <td>SKU: W5824R030930</td>
              <td>
                <button type="button">-</button>
                <button type="button">1</button>
                <button type="button">+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Cart
