import {
    call,
    put,
    select
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
    SecurityService
} from "../../../services";
import {
    getUserApplications
} from './../user.action';
import {
    getUserApplicationsSaga
} from './../user.saga';
import {
    getAccessToken
} from '../../security/security.selectors'

describe('user Sagas', () => {

    const json = { 'test': 'value' };
    const mockAccessToken = 'xxx';
    const errorToThrow = {
        data: {
            error: 'Custom Error Message'
        }
    }

    it('should call getUserApplicationsSaga function', () => {

        const generator = getUserApplicationsSaga();
        expect(generator.next().value).toEqual(select(getAccessToken));
        expect(generator.next(mockAccessToken).value).toEqual(call(SecurityService.getUserApplications, mockAccessToken));
        expect(generator.next(json).value).toEqual(put(getUserApplications.success(json)));
        expect(generator.next().done).toBe(true);
    });

    it('should dispatch failure action if fails', () => {

        const generator = getUserApplicationsSaga();
        expect(generator.next().value).toEqual(select(getAccessToken));
        expect(generator.next(mockAccessToken).value).toEqual(call(SecurityService.getUserApplications, mockAccessToken));
        expect(generator.throw(errorToThrow).value).toEqual(call(toast.warn, errorToThrow.data.error ));
        expect(generator.next().value).toEqual(put(getUserApplications.failure({ errorMessage: errorToThrow.data.error })));
        expect(generator.next().done).toBe(true);
    });
});