import {
    authenticateUser,    
    getAccessToken,
    logoutUser
} from './security.action';
import { AuthService } from '../../services'

const initialState = {
    isLoading: false,
    isLoggedIn: AuthService.isAuthenticated(),
    token: AuthService.getToken(),
    accessToken: AuthService.getAccessToken(),
    email: (AuthService.getUserDetail() ? AuthService.getUserDetail().email : undefined)
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
        default:
            return state;
    }
}