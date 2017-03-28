import React, { Component } from 'react'

class SignedInLayout extends Component {
  render () {
    return (
      <div className='SignedInLayout'>
        {this.props.children}
      </div>
    )
  }
}

export default SignedInLayout
