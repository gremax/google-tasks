import { EventEmitter } from 'events'
import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

const CHANGE_EVENT = 'change'

let _isSignedIn = false

const SessionStore = Object.assign({}, EventEmitter.prototype, {
  isSignedIn () {
    return _isSignedIn
  },

  emitChange () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

AppDispatcher.register(action => {
  console.info(action.type, action)

  switch (action.type) {
    case AppConstants.SESSION_AUTHORIZE_SUCCESS: {
      _isSignedIn = true
      SessionStore.emitChange()
      break
    }

    case AppConstants.SESSION_AUTHORIZE_ERROR: {
      _isSignedIn = false
      SessionStore.emitChange()
      break
    }

    default: {
    }
  }
})

export default SessionStore
