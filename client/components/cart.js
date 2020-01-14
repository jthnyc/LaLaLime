import React from 'react'

export default class Cart extends React.Component {
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
      <div>
        <h2>Shopping cart</h2>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//     getCartItems: () => dispatch(getCartItems())

// })
