import React from 'react'
import {getSingleProduct, addProductToCart, me} from '../store'
import {connect} from 'react-redux'

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
          <div className="product-card-grid-all">
            <div>{this.props.currentProduct.name}</div>
            <img src={this.props.currentProduct.imageUrl} />
            <button type="submit" onClick={this.handleClick}>
              Add to cart
            </button>
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
