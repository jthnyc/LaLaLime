import React from 'react'
import CartItem from './cart-item'
import {connect} from 'react-redux'
import {getCartItems, deleteProductFromCart} from '../store'

class Cart extends React.Component {
  constructor() {
    super()

    // this.increment = this.increment.bind(this)
    // this.decrement = this.decrement.bind(this)
    // this.removeFromCart = this.removeFromCart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    // this.increment = this.increment.bind(this)
  }

  componentDidMount() {
    this.props.getCartItems(this.props.match.params.userId)
  }

  // increment = () => {
  //   this.setState({
  //     quantity: this.state.quantity + 1
  //   })
  // }

  handleClick(evt) {
    console.log('EVENT', evt)
    evt.preventDefault()
    this.props.removeItem(this.props.match.params.userId)
  }

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
    console.log('THIS PROPS: ', this.props)
    return (
      <div className="cart-page">
        <h2>Shopping cart</h2>
        <div className="cart-list">
          {this.props.cartItems ? (
            this.props.cartItems.map(item => {
              return (
                <CartItem
                  key={item.productId}
                  item={item}
                  // increment={this.increment}
                  // decrement={this.decrement}
                  removeItem={this.handleClick}
                  userId={this.props.userId}
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
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartItems: userId => dispatch(getCartItems(userId)),
    removeItem: (userId, productId) =>
      dispatch(deleteProductFromCart(userId, productId))
    // increment: () => dispatch(incrementItemQuantity())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
