import React from 'react'

const Content = props => {
  const {close, handleClick} = props
  return (
    <div className="modal">
      <button className="close" onClick={close}>
        Okay!
      </button>

      <div className="content">Added to cart!</div>
    </div>
  )
}
export default Content

// {close => <Content close={close} />}</Popup>
