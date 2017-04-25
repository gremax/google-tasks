import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

import api from '../api'

const TasksActions = {
  loadTasks (taskListId) {
    AppDispatcher.dispatch({
      type: AppConstants.TASKS_LOAD_REQUEST
    })

    api.listTasks(taskListId)
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASKS_LOAD_SUCCESS,
          items: data.items || []
        })
      })
      .catch(error => {
        AppDispatcher.dispatch({
          type: AppConstants.TASKS_LOAD_FAIL,
          error: error
        })
      })
  },

  updateTaskStatus (params) {
    AppDispatcher.dispatch({
      type: AppConstants.TASK_UPDATE_REQUEST,
      taskId: params.taskId,
      isCompleted: params.isCompleted
    })

    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      status: params.isCompleted ? 'completed' : 'needsAction'
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_SUCCESS,
          task: data,
          taskId: params.taskId
        })
      })
      .catch(error => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_FAIL,
          error: error
        })
      })
  },

  createTask (params) {
    api.insertTask({
      taskListId: params.taskListId,
      title: params.text
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_CREATE_SUCCESS,
          task: data
        })
      })
      .catch(error => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_CREATE_FAIL,
          error: error
        })
      })
  },

  updateTask (params) {
    AppDispatcher.dispatch({
      type: AppConstants.TASK_UPDATE_REQUEST,
      taskId: params.taskId,
      text: params.text
    })

    api.updateTask({
      taskListId: params.taskListId,
      taskId: params.taskId,
      title: params.text
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_SUCCESS,
          task: data,
          taskId: params.taskId
        })
      })
      .catch(error => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_UPDATE_FAIL,
          error: error
        })
      })
  },

  deleteTask (taskListId, taskId) {
    api.deleteTask({
      taskListId: taskListId,
      taskId: taskId
    })
      .then(data => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_DELETE_SUCCESS,
          task: data,
          taskId: taskId
        })
      })
      .catch(error => {
        AppDispatcher.dispatch({
          type: AppConstants.TASK_DELETE_FAIL,
          error: error
        })
      })
  }
}

export default TasksActions
