/* eslint-disable react/void-dom-elements-no-children */
import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cart-item'
import {getOrderItems} from '../store'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipcode: 11111,
      phone: 111 - 111 - 1111
    }
  }

  handleChange(e) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e) {
    event.preventDefault()
    const newOrder = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      zipcode: this.state.zipcode,
      phone: this.state.phone
    }
    // will need to create a separate reducer to handle addOrderSubmit(newOrder)
  }

  render() {
    return (
      <div className="checkout-page">
        <h2>Order Confirmation</h2>
        <div className="checkout-list">
          {this.props.cartItems ? (
            this.props.cartItems.map(item => {
              return <CartItem key={item.productId} item={item} />
            })
          ) : (
            <div>Cart is empty!</div>
          )}
        </div>
        <div>
          <h2>Payment Information</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              value={this.state.address}
            />
            <div className="city-dropdown">
              <button type="button" className="city-drop-btn">
                City
              </button>
              <div className="city-drop-content">
                <li>New York</li>
                <li>Chicago</li>
                <li>San Francisco</li>
              </div>
            </div>
            <input type="text" className="zipcode">
              Zipcode
            </input>
            <input type="text" className="phone">
              Phone
            </input>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderItems: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderItems: userId => dispatch(getOrderItems(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
