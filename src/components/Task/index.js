import React, { Component } from 'react'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { bindAll } from 'lodash'

import './styles.css'

class Task extends Component {
  constructor () {
    super()
    this.state = { isEditing: false }
    bindAll(this, [
      'handleCheck',
      'handleEdit',
      'handleSave',
      'handleDelete',
      'handleCancel'
    ])
  }

  handleCheck () {
    this.props.onStatusChange({
      isCompleted: !this.props.isCompleted
    })
  }

  handleEdit (e) {
    this.setState({ isEditing: true }, this.focusInput)
  }

  handleCancel () {
    this.cancelEdit()
  }

  handleSave () {
    this.saveTask()
  }

  handleDelete () {
    this.props.onDelete(this.props.taskId)
  }

  focusInput () {
    this.input.focus()
  }

  saveTask () {
    this.props.onUpdate({ text: this.input.value })
    this.setState({ isEditing: false })
  }

  cancelEdit () {
    this.setState({ isEditing: false })
  }

  render () {
    return (
      this.state.isEditing
      ? <div className='Task editing'>
        <input
          className='Task__input'
          type='text'
          defaultValue={this.props.text}
          ref={c => this.input = c}
          />
        <div className='Task__toolbar'>
          <div>
            <RaisedButton primary onClick={this.handleSave} label='Save' />
            <FlatButton onClick={this.handleCancel} label='Cancel' />
          </div>
        </div>
      </div>
      : <div className='Task'>
        <Checkbox
          className='Task__checkbox'
          checked={this.props.isCompleted}
          onCheck={this.handleCheck}
          />
        <div className='Task__text'>
          <div className='Task__title'>{this.props.text}</div>
        </div>
        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
        </IconMenu>
      </div>
    )
  }
}

export default Task
