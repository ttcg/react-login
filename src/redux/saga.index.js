import { all } from 'redux-saga/effects';
import { default as UserSaga } from './user/user.saga'
import { default as SecuritySaga } from './security/security.saga'

export default function* rootSaga() {
    yield all([
        UserSaga(),
        SecuritySaga()
    ])
}