import React from 'react'
import {Link} from 'react'

const RecentItem = props => {
  const {item} = props
  return (
    <div key={item.id} className="cart-item">
      <div className="cart-item-row">
        <img src={item.imageUrl} width="100" height="120" />
        <div className="cart-item-detail">
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
