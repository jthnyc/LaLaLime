import React from 'react'

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart-product-row">
        <div>
          <img
            src="https://cdn.shopify.com/s/files/1/2185/2813/products/W5824R_03093R_1_8f37f807-0efa-4472-b478-6c353a5b5670.jpg?v=1578621956"
            width="100"
            height="120"
          />
        </div>
        <div className="cart-product-detail">
          <div>Super Fast Tron Leggings</div>
          <div>SKU: W5824R030930</div>
          <div>$20</div>
          <div className="quantity-btn">
            <button type="button">-</button>
            <button type="button">1</button>
            <button type="button">+</button>
          </div>
          <div>
            <button type="button">Edit</button>
          </div>
        </div>
        <div>
          <button type="button">X</button>
        </div>
      </div>
    )
  }
}

export default CartItem
