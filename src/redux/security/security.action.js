import { createRoutine } from 'redux-saga-routines';

export const authenticateUser = createRoutine('AUTHENTICATE');

export const getAccessToken = createRoutine('GET_ACCESS_TOKEN');

export const logoutUser = createRoutine('LOGOUT');

export const populateSecurityData = createRoutine('POPULATE_SECURITY_DATA');