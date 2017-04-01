import React, { Component } from 'react'

import './styles.css'

class TasksPage extends Component {
  render () {
    return (
      <div className='TasksPage'>
        <div className='TasksPage__header'>
          <h2 className='TasksPage__title'>List name</h2>
          <div className='TasksPage__tools' />
        </div>

        <div className='TasksPage__tasks' />
      </div>
    )
  }
}

export default TasksPage
