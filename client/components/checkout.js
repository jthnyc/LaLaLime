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
      zipcode: 0,
      phone: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
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
        <div className="checkout-payment-info">
          <h2>Payment Information</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
              placeholder="First Name"
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
              placeholder="Last Name"
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="Email"
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              value={this.state.address}
              placeholder="Address"
            />
            {/* may want to do city as a dropdown in tier 2*/}
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              onChange={this.handleChange}
              value={this.state.city}
              placeholder="City"
            />
            <label htmlFor="zipcode">Zipcode: </label>
            <input
              type="text"
              name="zipcode"
              onChange={this.handleChange}
              value={this.state.zipcode}
              placeholder="Zip Code"
            />
            <label htmlFor="phone">Phone: </label>
            <input
              type="text"
              name="phone"
              onChange={this.handleChange}
              value={this.state.phone}
              placeholder="Phone Number"
            />
          </form>
        </div>
        <div className="checkout-list">
          {this.props.orderItems ? (
            this.props.orderItems.map(item => {
              return <CartItem key={item.productId} item={item} />
            })
          ) : (
            <div>Cart is empty!</div>
          )}
        </div>
        <div className="checkout-summary">
          <h3>Subtotal </h3>
          <h2>Total </h2>
          <button type="submit">Confirm Order</button>
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
