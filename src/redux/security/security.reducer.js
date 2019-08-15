import {
    authenticateUser,    
    getAccessToken,
    logoutUser,
    populateSecurityData
} from './security.action';
import { AuthService } from '../../services'

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    token: AuthService.getToken(),
    accessToken: AuthService.getAccessToken()
};

export default function securityReducer(state = initialState, { payload, type }) {

    switch (type) {
        case authenticateUser.TRIGGER: {
            return {
                ...state,
                error: null,
                isLoading: true
            };
        }
        case authenticateUser.SUCCESS: {
            return {
                ...state,
                token: payload.token,
                email: payload.email,
                isLoggedIn: true,
                error: null,
                isLoading: false
            };
        }
        case authenticateUser.FAILURE: {
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        }
        case getAccessToken.SUCCESS: {
            return {
                ...state,
                accessToken: payload,
                error: null,
                isLoading: false
            };
        }
        case getAccessToken.FAILURE: {
            return {
                ...state,
                error: payload,
                isLoading: false
            };
        }
        case logoutUser.TRIGGER: {
            return {
                ...state,
                error: null,
                isLoading: true
            };
        }
        case populateSecurityData.TRIGGER: {
            return {
            ...state,
            isLoggedIn: payload.isLoggedIn,
            email: payload.email
            };
        }
        default:
            return state;
    }
}