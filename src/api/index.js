const CLIENT_ID = '238659955045-p41065ed9vr6jhbq549nqebjgq1ganfo.apps.googleusercontent.com'
const SCOPE = [
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/plus.me'
]

export default {
  authorize (params) {
    return new Promise((resolve, reject) => {
      gapi.auth.authorize(
        {
          'client_id': CLIENT_ID,
          'scope': SCOPE,
          'immediate': params.immediate,
          'cookie_policy': 'single_host_origin'
        },
        result => {
          if (result.error) {
            return reject(result.error)
          }

          return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve()))
        }
      )
    })
  },

  listTaskLists () {
    const request = gapi.client.tasks.tasklists.list()

    return new Promise((resolve, reject) => {
      request.execute(response => resolve(response))
    })
  },

  insertTaskList ({ title }) {
    const request = gapi.client.tasks.tasklists.insert({
      title: title
    })

    return new Promise((resolve, reject) => {
      request.execute(response => resolve(response))
    })
  }
}
