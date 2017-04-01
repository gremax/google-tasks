import React, { Component } from 'react'
import TaskListsStore from '../../stores/TaskListsStore'
import TaskListsActions from '../../actions/TaskListsActions'
import TaskListModal from '../TaskListModal'

import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import AddIcon from 'material-ui/svg-icons/content/add'
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app'
import FolderIcon from 'material-ui/svg-icons/file/folder'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ListIcon from 'material-ui/svg-icons/action/view-list'

import './styles.css'

function getStateFromFlux () {
  return {
    taskLists: TaskListsStore.getTaskLists()
  }
}

class TaskListsPage extends Component {
  constructor () {
    super()
    this.state = getStateFromFlux()
    this._onChange = this._onChange.bind(this)
    this.handleAddTaskList = this.handleAddTaskList.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleTaskListSubmit = this.handleTaskListSubmit.bind(this)
  }

  componentWillMount () {
    this.setState({ isTaskListModal: false })
    TaskListsActions.loadTaskLists()
  }

  componentDidMount () {
    TaskListsStore.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    TaskListsStore.removeChangeListener(this._onChange)
  }

  handleAddTaskList () {
    this.setState({ isTaskListModal: true })
  }

  handleClose () {
    this.setState({ isTaskListModal: false })
  }

  handleTaskListSubmit (taskList) {
    TaskListsActions.createTaskList(taskList)
    this.setState({ isTaskListModal: false })
  }

  render () {
    const { router } = this.context

    return (
      <div className='TasklistsPage'>
        <div className='TasklistsPage__menu'>
          <List className='TasklistsPage__list'>
            <h3 className='TasklistsPage__title'>Google Tasks</h3>
            <Divider />
            <List className='TasklistsPage__list'>
              <ListItem
                primaryText='Home'
                leftIcon={<HomeIcon />}
                onClick={router.push.bind(null, `/lists`)}
              />
              <ListItem
                primaryText='About'
                leftIcon={<ListIcon />}
                onClick={router.push.bind(null, `/about`)}
              />
            </List>
            <Divider />
            <List className='TasklistsPage__list'>
              <Subheader>Task Lists</Subheader>
              {
                this.state.taskLists.map(list =>
                  <ListItem
                    primaryText={list.name}
                    leftIcon={<FolderIcon />}
                    key={list.id}
                    onClick={router.push.bind(null, `/lists/${list.id}`)}
                  />
                )
              }
              <ListItem
                primaryText='Create new list'
                leftIcon={<AddIcon />}
                onClick={this.handleAddTaskList}
              />
            </List>
            <Divider />
            <List className='TasklistsPage__list'>
              <ListItem
                primaryText='Log out'
                leftIcon={<ExitIcon />}
              />
            </List>
          </List>
        </div>
        <div className='TasklistsPage__tasks'>
          {this.props.children}
        </div>
        <TaskListModal
          isOpen={this.state.isTaskListModal}
          onSubmit={this.handleTaskListSubmit}
          onClose={this.handleClose}
        />
      </div>
    )
  }

  _onChange () {
    this.setState(getStateFromFlux())
  }
}

TaskListsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default TaskListsPage
