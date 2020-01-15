import React from 'react'
import {getSingleProduct} from '../store'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

class SingleProduct extends React.Component {
  componentDidMount() {
    console.log('componentdidmount', this.props)
    this.props.getSingleProduct(this.props.id)
  }

  render() {
    console.log('render', this.props)
    // const products = this.props.products
    return (
      <div>
        <div className="faceted-grid">
          <div className="product-card-grid-all">
            <div>{this.props.currentProduct.name}</div>
            <img src={this.props.currentProduct.imageUrl} />
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
    id: ownProps.match.params.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
