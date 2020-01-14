import React from 'react'
import {getSingleProduct} from '../store'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.SKU)
  }

  render() {
    console.log(this.props.SKU)
    // const products = this.props.products
    return (
      <div>
        <div className="faceted-grid">
          <div className="product-card-grid-all">
            {/* <div className="product-card">
              {products ? (
                products.map(product => {
                  return <Product key={product.id} product={product} />
                })
              ) : (
                <div>No products :/</div>
              )}
            </div> */}
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
    products: state.product.products,
    SKU: ownProps.match.params.SKU
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: SKU => dispatch(getSingleProduct(SKU))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
