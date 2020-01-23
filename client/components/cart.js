import React from 'react'
import CartItem from './cart-item'
import {connect} from 'react-redux'
import {getCartItems} from '../store'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItems(this.props.match.params.userId)
  }

  // will probably need to add new action submitOrder and add a handleclick in component

  render() {
    // let subtotal = this.props.cartItems.reduce(
    // (acc, item) => acc + item.product.price * item.quantity,
    // 0
    // )
    // may need to leave this to tier 2?
    // let subtotalWithTax

    // eslint-disable-next-line no-return-assign
    if (this.props.match.params.userId == this.props.userId) {
      return (
        <div className="cart-page">
          <div className="cart-list">
            <h2>Shopping cart</h2>
            <div className="cart-item-wrapper">
              {this.props.cartItems[0] ? (
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
                <div>
                  <p>No items in cart ...</p>
                  <Link to="/products">
                    <h3>
                      It's Time to <span>Treat Yourself</span>
                    </h3>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="cart-order-summary">
            <div className="cart-line-items">
              <h2>Order Summary</h2>
              <h4>
                Subtotal: $
                {this.props.cartItems.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                )}
              </h4>
              {/* // perhaps we can consider to include shipping in tier 2?
            <h4>Shipping: </h4> */}
              {/* <h2>Subtotal: {subtotal}</h2> */}
              <Link to={`/cart/${this.props.userId}/checkout`}>
                <button
                  type="button"
                  className="cart-checkout-btn"
                  disabled={!this.props.cartItems[0]}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>OOOPS Forbidden</div>
    }
  }
}

const mapStateToProps = state => {
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
