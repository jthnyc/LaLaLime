/* eslint-disable react/void-dom-elements-no-children */
import React from 'react'
import {connect} from 'react-redux'
import OrderItem from './order-item'
import {getOrderItems} from '../store'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

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

  async handleSubmit(event) {
    event.preventDefault()
    const newOrder = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      zipcode: this.state.zipcode,
      phone: this.state.phone,
      amount: this.props.subtotal
    }
    let {token} = await this.props.stripe.createToken({
      name: `${this.state.email}`,
      another: 'random'
    })
    let response = await axios.post('/charge', {
      tokenId: token.id,
      amount: this.props.subtotal,
      description: this.props.cartItems[0].orderId
    })
    if (response.statusText === 'ok') {
      //place holder for further steps
      alert('Purchase Complete!')
    } else {
      // placeholder
    }
    // will need to create a separate reducer to handle addOrderSubmit(newOrder)
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div className="checkout-page">
        <div className="checkout-payment-info">
          <h2 className="checkout">Payment Information</h2>
          <form
            id="checkout-form"
            action="/charge"
            method="post"
            onSubmit={this.handleSubmit}
          >
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
          {this.props.cartItems ? (
            this.props.cartItems.map(item => {
              return <OrderItem key={item.productId} item={item} />
            })
          ) : (
            <div>Cart is empty!</div>
          )}
        </div>
        <div className="checkout-summary">
          <h3>Subtotal :</h3>
          <h2>${this.props.subtotal}</h2>
          <CardElement />
          <button
            type="submit"
            form="checkout-form"
            onClick={this.handleSubmit}
          >
            Confirm Order
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems,
    subtotal: state.cart.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderItems: userId => dispatch(getOrderItems(userId)),
    updateOrderStatus: orderId => dispatch(updateOrderStatus(orderId))
  }
}
const injected = injectStripe(Checkout)

export default connect(mapStateToProps, mapDispatchToProps)(injected)
