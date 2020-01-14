import React from 'react'
import {getSingleProduct} from '../store'
import {connect} from 'react-redux'
import Product from './product'

/**
 * COMPONENT
 */

class singleProduct extends React.Component {
  componentDidMount() {
    // this.props.getSingleProduct(SKU)
  }

  render() {
    console.log(this.props.SKU)
    const products = this.props.products
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
    SKU: ownProps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: () => dispatch(getSingleProduct())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleProduct)
