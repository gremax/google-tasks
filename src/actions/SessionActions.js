import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import api           from '../api';

const SessionActions = {
  authorize(immediate = false, callback) {
    api.authorize({ immediate })
      .then(() => {
        AppDispatcher.dispatch({
          type: AppConstants.SESSION_AUTHORIZE_SUCCESS
        })
        if (immediate) {
          callback();
        }
      }).catch((error) => {
        AppDispatcher.dispatch({
          type: AppConstants.SESSION_AUTHORIZE_ERROR
        })
        if (immediate) {
          callback();
        }
      })
  }
};

export default SessionActions;
