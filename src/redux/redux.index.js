import { combineReducers } from 'redux';

import { RESET_ALL_STATE } from './actionTypes'
import UserReducer from './user/user.reducer'
import SecurityReducer from './security/security.reducer'
import ajaxCounterReducer from './ajaxCounter/ajaxCounter.reducer'

const appReducer = combineReducers({
    UserReducer,
    Security: SecurityReducer,
    AjaxCounter: ajaxCounterReducer
})

const rootReducer = (state, action) => {
    if (action.type === RESET_ALL_STATE) {
        state = { 
            ...state,
            Security: {
                isLoading: false
            },
            AjaxCounter: 0
        };
      }
    return appReducer(state, action)
}

export default rootReducer;