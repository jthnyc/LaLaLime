import React from 'react'
import {getSingleProduct, addProductToCart, me} from '../store'
import {connect} from 'react-redux'
import Popup from 'reactjs-popup'

import Content from './popup-content.js'
/**
 * COMPONENT
 */

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.productId)
    this.props.getMe()
  }

  handleClick(evt) {
    evt.preventDefault()
    console.log('handleclick', this.props.userId, this.props.productId)
    this.props.addProductToCart(this.props.userId, this.props.productId)
  }

  render() {
    return (
      <div>
        <div className="faceted-grid">
          <div className="product-card-grid-left">
            <img src={this.props.currentProduct.imageUrl} />
          </div>
          <div className="product-card-grid-right">
            <div id="single-product-name">{this.props.currentProduct.name}</div>
            <div id="single-product-price">
              ${this.props.currentProduct.price}
            </div>
            <div id="single-product-description">
              {this.props.currentProduct.description}
            </div>
            <div>
              <Popup
                modal
                trigger={
                  <button
                    id="single-product-submit-button"
                    type="submit"
                    onClick={this.handleClick}
                  >
                    Add to cart
                  </button>
                }
                handleClick={this.props.handleClick}
              >
                <button onClick={this.handleClick}>Okay</button>
                <div>Added to cart!</div>
              </Popup>

              {/* <Content handleClick={this.props.handleClick} close={close} /></Popup> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = (state, ownProps) => {
  return {
    currentProduct: state.product.currentProduct,
    productId: ownProps.match.params.id,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    getMe: () => dispatch(me()),
    addProductToCart: (userId, productId) =>
      dispatch(addProductToCart(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
