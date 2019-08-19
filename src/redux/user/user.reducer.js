import {    
    getUserApplications
} from './user.action';

const initialState = {
    isLoading: false,
    applications: []
};

export default function userReducer(state = initialState, { payload, type }) {

    switch (type) {
        case getUserApplications.TRIGGER: {
            return {
                ...state,                                             
                isLoading: true
            };
        }
        case getUserApplications.SUCCESS: {
            return {
                ...state,
                applications: payload.applications,           
                error: null,                
                isLoading: false
            };
        }
        default:
            return state;
    }
}