import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { bindAll } from 'lodash'

class TaskListModal extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '' }
    bindAll(this, [
      'handleClose',
      'handleSubmit',
      'handleTextChange'
    ])
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
          hintText='e.g. Books, Movies'
          floatingLabelText='Enter task list name'
        />
      </Dialog>
    )
  }
}

export default TaskListModal
