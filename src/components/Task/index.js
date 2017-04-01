import React, { Component } from 'react'

import Checkbox from 'material-ui/Checkbox'

import './styles.css'

class Task extends Component {
  render () {
    return (
      <div className='Task'>
        <Checkbox
          className='Task__checkbox'
          checked={this.props.isCompleted}
        />
        <div className='Task__text'>
          <div className='Task__title'>{this.props.text}</div>
        </div>
      </div>
    )
  }
}

export default Task
