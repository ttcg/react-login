import {
    call,
    put,
    select,
    takeLatest
} from 'redux-saga/effects';
import {
    AuthService,
    SecurityService
} from "../../services";
import {
    authenticateUser,
    getAccessToken,
    logoutUser
} from './security.action';
import {
    getAccessToken as getAccessTokenFromState
} from './security.selectors'
import { beginAjaxCall } from '../ajaxCounter/ajaxCounter.action'
import { RESET_ALL_STATE } from '../actionTypes'

export function* authenticateUserSaga({ payload }) {
    try {
        yield put(beginAjaxCall());
        const { token, succeeded } = yield call(SecurityService.authenticate, payload);

        if (succeeded) {
            yield put(authenticateUser.success({
                email: payload.email,
                token: token
            }));
            yield call(AuthService.setUserDetail, JSON.stringify({ email: payload.email }));
            yield call(AuthService.setToken, token);
            yield call(getAccessTokenSaga, token);
        }
        else {
            yield put(authenticateUser.failure({ errorMessage: 'Wrong Password' }));
        }
    }
    catch (error) {
        yield put(authenticateUser.failure({ errorMessage: error.data.error }));
    }
}

export function* getAccessTokenSaga(payload) {
    try {
        yield put(beginAjaxCall());
        const { accessToken } = yield call(SecurityService.getAccessToken, payload);
        yield call(AuthService.setAccessToken, accessToken);
        yield put(getAccessToken.success(accessToken));
    }
    catch (error) {
        yield put(getAccessToken.failure({ errorMessage: error.data.error }));
    }
}

export function* logoutUserSaga() {
    try {
        yield put(beginAjaxCall());
        const accessToken = yield select(getAccessTokenFromState);
        yield call(SecurityService.logoutUser, accessToken);        
    }
    catch (error) {        
        yield put(logoutUser.failure({ errorMessage: error.data.error }));
    }

    // clear all traces, cookies, local storage, states...
    yield call([localStorage, localStorage.clear]);
    yield call(AuthService.removeToken);

    yield put({ type: RESET_ALL_STATE });
}

export default function* watcherSaga() {
    yield takeLatest(authenticateUser.TRIGGER, authenticateUserSaga);
    yield takeLatest(logoutUser.TRIGGER, logoutUserSaga);
    yield takeLatest(getAccessToken.TRIGGER, getAccessTokenSaga);
}