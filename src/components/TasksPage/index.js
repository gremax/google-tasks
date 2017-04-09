import React, { Component } from 'react'

import TasksStore from '../../stores/TasksStore'
import TasksActions from '../../actions/TasksActions'
import Task from '../Task'
import TaskModal from '../TaskModal'

import AddIcon from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'

import './styles.css'

function getStateFromFlux () {
  return {
    tasks: TasksStore.getTasks()
  }
}

class TasksPage extends Component {
  constructor () {
    super()
    this.state = { ...getStateFromFlux(), isTaskModal: false }
    this._onChange = this._onChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleAddTask = this.handleAddTask.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this)
  }

  componentWillMount () {
    TasksActions.loadTasks(this.props.params.id)
  }

  componentDidMount () {
    TasksStore.addChangeListener(this._onChange)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      TasksActions.loadTasks(nextProps.params.id)
    }
  }

  componentWillUnmount () {
    TasksStore.removeChangeListener(this._onChange)
  }

  handleStatusChange (taskId, { isCompleted }) {
    TasksActions.updateTaskStatus({
      taskListId: this.props.params.id,
      taskId: taskId,
      isCompleted: isCompleted
    })
  }

  handleAddTask () {
    this.setState({ isTaskModal: true })
  }

  handleClose () {
    this.setState({ isTaskModal: false })
  }

  handleTaskSubmit (task) {
    const taskListId = this.props.params.id
    TasksActions.createTask({ taskListId, ...task })
    this.setState({ isTaskModal: false })
  }

  render () {
    return (
      <div className='TasksPage'>
        <div className='TasksPage__header'>
          <h2 className='TasksPage__title'>List name</h2>
          <div className='TasksPage__tools'>
            <IconButton onClick={this.handleAddTask}>
              <AddIcon />
            </IconButton>
          </div>
        </div>

        <div className='TasksPage__tasks'>
          {
            this.state.tasks.map(task =>
              <Task
                key={task.id}
                text={task.text}
                isCompleted={task.isCompleted}
                onStatusChange={this.handleStatusChange.bind(null, task.id)}
              />
            )
          }
        </div>
        <TaskModal
          isOpen={this.state.isTaskModal}
          onSubmit={this.handleTaskSubmit}
          onClose={this.handleClose}
        />
      </div>
    )
  }

  _onChange () {
    this.setState(getStateFromFlux())
  }
}

export default TasksPage
