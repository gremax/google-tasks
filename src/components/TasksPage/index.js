import React, { Component } from 'react'
import TasksStore from '../../stores/TasksStore'
import TaskListsStore from '../../stores/TaskListsStore'
import TasksActions from '../../actions/TasksActions'
import TaskListsActions from '../../actions/TaskListsActions'
import Task from '../Task'
import TaskModal from '../TaskModal'
import AddIcon from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import { bindAll } from 'lodash'

import './styles.css'

function getStateFromFlux () {
  return {
    isLoadingTasks: TasksStore.isLoadingTasks(),
    error: TasksStore.getError(),
    tasks: TasksStore.getTasks(),
    taskList: TaskListsStore.getCurrentTaskList() || {}
  }
}

class TasksPage extends Component {
  constructor () {
    super()
    this.state = { ...getStateFromFlux(), isTaskModal: false }
    bindAll(this, [
      '_onChange',
      'handleStatusChange',
      'handleAddTask',
      'handleClose',
      'handleTaskSubmit',
      'handleTaskUpdate',
      'handleTaskDelete'
    ])
  }

  componentWillMount () {
    TasksActions.loadTasks(this.props.params.id)
    TaskListsActions.loadTaskList(this.props.params.id)
  }

  componentDidMount () {
    TasksStore.addChangeListener(this._onChange)
    TaskListsStore.addChangeListener(this._onChange)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      TasksActions.loadTasks(nextProps.params.id)
      TaskListsActions.loadTaskList(nextProps.params.id)
    }
  }

  componentWillUnmount () {
    TasksStore.removeChangeListener(this._onChange)
    TaskListsStore.removeChangeListener(this._onChange)
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

  handleTaskUpdate (taskId, { text }) {
    TasksActions.updateTask({
      taskListId: this.props.params.id,
      taskId: taskId,
      text: text
    })
  }

  handleTaskDelete (taskId) {
    TasksActions.deleteTask(this.props.params.id, taskId)
  }

  render () {
    if (this.state.error) {
      return (
        <div className='TasksPage'>
          {this.state.error}
        </div>
      )
    }

    return (
      <div className='TasksPage'>
        <div className='TasksPage__header'>
          <h2 className='TasksPage__title'>{this.state.taskList.name}</h2>
          <div className='TasksPage__tools'>
            <IconButton onClick={this.handleAddTask}>
              <AddIcon />
            </IconButton>
          </div>
        </div>

        { this.state.isLoadingTasks ? 'Loading...' : null }

        <div className='TasksPage__tasks'>
          {
            this.state.tasks.map(task =>
              <Task
                key={task.id}
                taskId={task.id}
                text={task.text}
                isCompleted={task.isCompleted}
                onStatusChange={this.handleStatusChange.bind(null, task.id)}
                onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                onDelete={this.handleTaskDelete.bind(null, task.id)}
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
