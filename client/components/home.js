import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <div>
            <h2 className="home-header">New Arrivals</h2>
            <div>
              <Link to="/products">
                <button
                  className="home-button"
                  type="button"
                  onClick={this.handleclick}
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          <img
            className="home-image"
            src="https://classpass-res.cloudinary.com/image/upload/f_auto,q_auto/n64dslxthjbzh2y53tgz.png"
          />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

export default Home
