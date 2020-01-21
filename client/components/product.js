import React from 'react'
import {Link} from 'react-router-dom'

const Product = props => {
  return (
    <div className="product-card-inner">
      <Link to={`/products/${props.product.id}`}>
        <img className="product-card-image" src={props.product.imageUrl} />
      </Link>
      <Link to={`/products/${props.product.id}`}>
        <div className="product-card-name">{props.product.name}</div>
      </Link>
      <div className="product-card-price">${props.product.price}</div>
    </div>
  )
}

export default Product
