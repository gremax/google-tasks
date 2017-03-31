import React, { Component } from 'react'
import './styles.css'

class SignedInLayout extends Component {
  render () {
    return (
      <div className='SignedInLayout'>
        <div className='SignedInLayout__content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default SignedInLayout
