import {
    call,
    put,
    select
} from 'redux-saga/effects';
import { beginAjaxCall } from '../../ajaxCounter/ajaxCounter.action'
import {
    AuthService,
    SecurityService
} from "../../../services";
import {
    authenticateUser,
    getAccessToken,
    logoutUser
} from './../security.action';
import {
    authenticateUserSaga,
    getAccessTokenSaga,
    logoutUserSaga
} from './../security.saga';
import {
    getAccessToken as getAccessTokenFromState
} from './../security.selectors'
import { RESET_ALL_STATE } from '../../actionTypes'

describe('AuthenticateUser', () => {

    const action = {
        payload: {
            email: 'a@a.com',
            password: 'abc123',
            environment: 'test'
        }
    };    

    const errorToThrow = {
        data: {
            error: 'Custom Error Message'
        }
    }

    it('should call GetAccessToken when succeeded', () => {

        const result = {
            token: 'xxx',
            succeeded: true
        }
        const generator = authenticateUserSaga(action);
        expect(generator.next().value).toEqual(put(beginAjaxCall()));
        expect(generator.next().value).toEqual(call(SecurityService.authenticate, action.payload));
        expect(generator.next(result).value).toEqual(put(authenticateUser.success({
            email: action.payload.email,
            token: result.token
        })));
        expect(generator.next().value).toEqual(call(AuthService.setUserDetail, JSON.stringify({ email: action.payload.email })));
        expect(generator.next().value).toEqual(call(AuthService.setToken, result.token));
        expect(generator.next().value).toEqual(call(getAccessTokenSaga, result.token));
        expect(generator.next().done).toBe(true);
    });

    it('should call authenticateUser.failure when failed', () => {

        const result = {            
            succeeded: false
        }
        const generator = authenticateUserSaga(action);
        expect(generator.next().value).toEqual(put(beginAjaxCall()));
        expect(generator.next().value).toEqual(call(SecurityService.authenticate, action.payload));
        expect(generator.next(result).value).toEqual(put(authenticateUser.failure({ errorMessage: 'Wrong Password' })));
        expect(generator.next().done).toBe(true);
    });

    it('should handle exception in authenticateUserSaga function', () => {

        const generator = authenticateUserSaga(action);
        expect(generator.next().value).toEqual(put(beginAjaxCall()));
        expect(generator.next().value).toEqual(call(SecurityService.authenticate, action.payload));
        expect(generator.throw(errorToThrow).value).toEqual(put(authenticateUser.failure({ errorMessage: errorToThrow.data.error })));
        expect(generator.next().done).toBe(true);
    });
});

describe('GetAccessToken', () => {

    const token = 'xxx';

    const errorToThrow = {
        data: {
            error: 'Custom Error Message'
        }
    }

    it('should get access token', () => {

        const accessToken = 'xxx';
        const generator = getAccessTokenSaga(token);
        expect(generator.next().value).toEqual(put(beginAjaxCall()));
        expect(generator.next().value).toEqual(call(SecurityService.getAccessToken, token));
        expect(generator.next({ accessToken }).value).toEqual(call(AuthService.setAccessToken, accessToken));
        expect(generator.next().value).toEqual(put(getAccessToken.success(accessToken)));
        expect(generator.next().done).toBe(true);
    });

    it('should dispatch failure action if fails', () => {

        const generator = getAccessTokenSaga(token);
        expect(generator.next().value).toEqual(put(beginAjaxCall()));
        expect(generator.next().value).toEqual(call(SecurityService.getAccessToken, token));
        expect(generator.throw(errorToThrow).value).toEqual(put(getAccessToken.failure({ errorMessage: errorToThrow.data.error })));
        expect(generator.next().done).toBe(true);
    });
});

describe('LogoutUser', () => {

    const accessToken = 'xxx';

    const errorToThrow = {
        data: {
            error: 'Custom Error Message'
        }
    }

    it('should call logout user', () => {

        const generator = logoutUserSaga();
        expect(generator.next().value).toEqual(put(beginAjaxCall()));
        expect(generator.next().value).toEqual(select(getAccessTokenFromState));
        expect(generator.next(accessToken).value).toEqual(call(SecurityService.logoutUser, accessToken));
        expect(generator.next().value).toEqual(call([localStorage, localStorage.clear]));
        expect(generator.next().value).toEqual(call(AuthService.removeToken));
        expect(generator.next().value).toEqual(put({ type: RESET_ALL_STATE }));
        expect(generator.next().done).toBe(true);
    });

    it('should dispatch failure action if fails', () => {

        const generator = logoutUserSaga();
        expect(generator.next().value).toEqual(put(beginAjaxCall()));
        expect(generator.next().value).toEqual(select(getAccessTokenFromState));
        expect(generator.throw(errorToThrow).value).toEqual(put(logoutUser.failure({ errorMessage: errorToThrow.data.error })));
        expect(generator.next().value).toEqual(call([localStorage, localStorage.clear]));
        expect(generator.next().value).toEqual(call(AuthService.removeToken));
        expect(generator.next().value).toEqual(put({ type: RESET_ALL_STATE }));
        expect(generator.next().done).toBe(true);
    });
});