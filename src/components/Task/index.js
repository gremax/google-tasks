import React, { Component } from 'react'

import Checkbox from 'material-ui/Checkbox'

import './styles.css'

class Task extends Component {
  constructor () {
    super()
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck () {
    this.props.onStatusChange({
      isCompleted: !this.props.isCompleted
    })
  }

  render () {
    return (
      <div className='Task'>
        <Checkbox
          className='Task__checkbox'
          checked={this.props.isCompleted}
          onCheck={this.handleCheck}
        />
        <div className='Task__text'>
          <div className='Task__title'>{this.props.text}</div>
        </div>
      </div>
    )
  }
}

export default Task
