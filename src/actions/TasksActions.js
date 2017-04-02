import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

import api from '../api'

const TasksActions = {
  loadTasks (taskListId) {
    api.listTasks(taskListId)
      .then(data => {
        console.log(data)
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
  }
}

export default TasksActions
