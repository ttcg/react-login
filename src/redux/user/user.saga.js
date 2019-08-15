import {
    call,
    put,
    select,
    takeLatest
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { 
    SecurityService
} from "../../services";
import {
    getUserApplications
} from './user.action';
import {
    getAccessToken
} from '../security/security.selectors'

export function* getUserApplicationsSaga() {
    try {
        const accessToken = yield select(getAccessToken);
        var json = yield call(SecurityService.getUserApplications, accessToken)
        yield put(getUserApplications.success(json));
    }
    catch (error) {
        yield call(toast.warn, error.data.error);
        yield put(getUserApplications.failure({ errorMessage: error.data.error }));
    }
}

export default function* watcherSaga() {
    yield takeLatest(getUserApplications.TRIGGER, getUserApplicationsSaga);
}