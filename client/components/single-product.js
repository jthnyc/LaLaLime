import React from 'react'
import {getSingleProduct, me} from '../store'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.productId)
    this.props.getMe()
  }

  handleClick() {}

  render() {
    console.log('render props', this.props)
    return (
      <div>
        <div className="faceted-grid">
          <div className="product-card-grid-all">
            <div>{this.props.currentProduct.name}</div>
            <img src={this.props.currentProduct.imageUrl} />
            <button onClick={handleClick}>Add to cart</button>
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
  console.log('mapstatetoprops', state)
  return {
    currentProduct: state.product.currentProduct,
    productId: ownProps.match.params.id,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    getMe: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
