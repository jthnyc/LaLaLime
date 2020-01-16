import React from 'react'
import CartItem from './cart-item'
import {connect} from 'react-redux'
import {getCartItems} from '../store'

class Cart extends React.Component {
  // constructor() {
  //   super()
  //   this.increment = this.increment.bind(this)
  //   this.decrement = this.decrement.bind(this)
  //   this.removeFromCart = this.removeFromCart.bind(this)
  // }

  componentDidMount() {
    this.props.getCartItems()
  }

  // increment(item) {
  //   const max = 10
  //   if (item.quantity < max) {
  //     item.quantity++
  //   } else {
  //     this.setState({
  //       outOfStock: true
  //     })
  //     alert('Womp womp... no more...')
  //   }
  // }

  // decrement(item) {
  //   if (item.quantity >= 1) {
  //     item.quantity--
  //   }
  //   if (item.quantity === 0) {
  //     this.removeFromCart(item)
  //   }
  // }

  // removeFromCart(item) {
  //   const newItems = this.props.cartItems.slice()
  //   newItems.splice(newItems.indexOf(item))
  //   this.setState({
  //     cartItems: newItems
  //   })
  // }

  render() {
    return (
      <div className="cart-page">
        <h2>Shopping cart</h2>
        <div className="cart-list">
          {this.props.cartItems ? (
            this.props.cartItems.map(item => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  // increment={this.increment}
                  // decrement={this.decrement}
                  // remove={this.removeFromCart}
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

const mapStateToProps = state => {
  console.log('STATE IN CART: ', state)
  return {
    cartItems: state.cart.cartItems,
    userId: state.user.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartItems: () => dispatch(getCartItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
