import React, { Component } from 'react'

import TasksStore from '../../stores/TasksStore'
import TasksActions from '../../actions/TasksActions'
import Task from '../Task'
// import TaskListModal from '../TaskListModal'

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
    this.state = getStateFromFlux()
    this._onChange = this._onChange.bind(this)
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
          <ul>
            {
              this.state.tasks.map(task =>
                <Task
                  key={task.id}
                  text={task.text}
                  isCompleted={task.isCompleted}
                />
              )
            }
          </ul>
        </div>
      </div>
    )
  }

  _onChange () {
    this.setState(getStateFromFlux())
  }
}

export default TasksPage
