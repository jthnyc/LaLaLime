import React from 'react'
import {getProducts} from '../store'
import {connect} from 'react-redux'

class AllProducts extends React.Component {}

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
