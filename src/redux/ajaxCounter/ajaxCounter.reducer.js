import { AJAX_BEGIN_CALL } from '../actionTypes';

var initialState = {
    numberOfAjaxCall: 0
}

function actionTypeEndsInInSuccess(type) {
    return type.substring(type.length - 7) === 'SUCCESS';
}

function actionTypeEndsInInError(type) {
    return (type.substring(type.length - 6) === '_ERROR' 
        || type.substring(type.length - 7) === 'FAILURE');
}

const ajaxStatusReducer = (state = initialState.numberOfAjaxCall, action) => {
    if (action.type === AJAX_BEGIN_CALL) {
        return state + 1;
    }
    else if (actionTypeEndsInInSuccess(action.type)
            || actionTypeEndsInInError(action.type)) {
        return state - 1 < 0 ? 0 : state - 1;
    }

    return state;
}

export default ajaxStatusReducer;