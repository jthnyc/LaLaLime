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
          <div className="product-card-grid-all">
            <div className="product-card">
              {products.map(product => {
                return <Product key={product.id} product={product} />
              })}
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

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapDispatchToProps, mapStateToProps)(AllProducts)
