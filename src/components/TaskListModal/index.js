import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

class TaskListModal extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '' }
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleClose () {
    const { onClose } = this.props
    this.setState({ name: '' })

    if (onClose) {
      onClose()
    }
  }

  handleSubmit () {
    const { onSubmit } = this.props

    if (onSubmit) {
      onSubmit({
        name: this.state.name
      })
    }

    this.setState({ name: '' })
  }

  handleTextChange (e) {
    this.setState({
      name: e.target.value
    })
  }

  render () {
    const { name } = this.state
    const { isOpen } = this.props

    return (
      <Dialog
        actions={[
          <FlatButton
            label='Cancel'
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            primary
            label='Submit'
            disabled={!name}
            onTouchTap={this.handleSubmit}
          />
        ]}
        open={isOpen}
        onRequestClose={this.handleClose}
        contentStyle={{ maxWidth: 400 }}
      >
        <h3>Add task list</h3>
        <TextField
          fullWidth
          ref={c => this.taskInput = c}
          value={name}
          onChange={this.handleTextChange}
          hintText='e.g. finish PDP'
          floatingLabelText='Enter task list name'
        />
      </Dialog>
    )
  }
}

export default TaskListModal
