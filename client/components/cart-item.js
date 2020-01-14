import React from 'react'

class CartItem extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <img
            src="https://cdn.shopify.com/s/files/1/2185/2813/products/W5824R_03093R_1_8f37f807-0efa-4472-b478-6c353a5b5670.jpg?v=1578621956"
            width="100"
            height="120"
          />
        </td>
        <td>Super Fast Tron Leggings</td>
        <td>$20</td>
        <td>SKU: W5824R030930</td>
        <td>
          <button type="button">-</button>
          <button type="button">1</button>
          <button type="button">+</button>
        </td>
      </tr>
    )
  }
}

export default CartItem
