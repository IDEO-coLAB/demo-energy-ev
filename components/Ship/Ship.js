// This is an example of a react component that can be reused throughout a site

import React, { Component, PropTypes } from 'react'

// local styles
import s from './styles.css'

class ShipComponent extends Component {
  render() {
    let x = this.props.x * 100 // value between 0 and 1 is passed
    s.left = `${x}%`
    return (
      <div className={s.ship} />
    )
  }
}

export default ShipComponent

