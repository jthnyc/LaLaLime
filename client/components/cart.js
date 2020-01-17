import React from 'react'
import CartItem from './cart-item'
import {connect} from 'react-redux'
import {getCartItems} from '../store'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItems(this.props.match.params.userId)
  }

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
    getCartItems: userId => dispatch(getCartItems(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
