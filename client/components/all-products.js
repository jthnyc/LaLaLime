import React from 'react'
import {getProducts} from '../store'
import {connect} from 'react-redux'
import Product from './product'

/**
 * COMPONENT
 */

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <div className="faceted-grid">
          <h2>New Arrivals</h2>
          <div className="product-card">
            {products ? (
              products.map(product => {
                return <Product key={product.id} product={product} />
              })
            ) : (
              <div>No products :/</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapStateToProps = state => {
  return {
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
