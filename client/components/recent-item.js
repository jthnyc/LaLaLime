import React from 'react'
import {Link} from 'react-router-dom'

const RecentItem = props => {
  const {item} = props
  return (
    <div key={item.id} className="cart-item-recently-viewed">
      <div className="cart-item-row-recently-viewed">
        <img src={item.imageUrl} width="100" height="120" />
        <div className="cart-item-detail-recently-viewed">
          <Link to={`/products/${item.id}`}>
            <b>{item.name}</b>
          </Link>
          <div>SKU: {item.SKU}</div>
          <div>Color: {item.color}</div>
          <div>Size: {item.size}</div>
          <b>${item.price}</b>
        </div>
      </div>
    </div>
  )
}
export default RecentItem
