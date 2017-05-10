import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { bindAll } from 'lodash'

class TaskModal extends Component {
  constructor () {
    super()
    this.state = { text: '' }
    bindAll(this, [
      'handleClose',
      'handleSubmit',
      'handleTextChange'
    ])
  }

  handleClose () {
    const { onClose } = this.props
    this.setState({ text: '' })

    if (onClose) {
      onClose()
    }
  }

  handleSubmit () {
    const { onSubmit } = this.props

    if (onSubmit) {
      onSubmit({
        text: this.state.text
      })
    }

    this.setState({ text: '' })
  }

  handleTextChange (e) {
    this.setState({
      text: e.target.value
    })
  }

  render () {
    const { text } = this.state
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
            disabled={!text}
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
          value={text}
          onChange={this.handleTextChange}
          hintText='e.g. finish pdp'
          floatingLabelText='Enter task name'
        />
      </Dialog>
    )
  }
}

export default TaskModal
