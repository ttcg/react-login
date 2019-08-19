import axios from 'axios';
import uuid from 'uuid';
import getServiceUrl from './serviceUrl'
import {
    mockAuthenticate,
    mockGetAccessToken,
    mockGetUserApplications
} from './mockSecurityService'

const client = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

function onSuccess(response) {
    return response.data;
}

function onError(error) {
    console.error('Request Failed:', error.config);

    let errorObj = {};

    if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        console.error('Headers:', error.response.headers);

        errorObj = error.response;
    } else {
        // Something else happened while setting up the request
        // triggered the error
        console.error('Error Message:', error.message);

        errorObj = {
            data: {
                error: error.message
            }
        }
    }

    return Promise.reject(errorObj);
}

function authenticate(data) {

    var postObject = {
        "messageId": uuid.v4(),

        "email": data.email,
        "password": data.password
    }

    log(getServiceUrl().commandUrl, postObject);

    // return client
    //     .post(getServiceUrl().commandUrl, postObject)
    //     .then(onSuccess)
    //     .catch(onError);

    return mockAuthenticate(postObject);
}

function getAccessToken(data) {

    var postObject = {
        "messageId": uuid.v4(),

        "token": data
    }

    log(getServiceUrl().commandUrl, postObject);

    // return client
    //     .post(getServiceUrl().commandUrl, postObject)
    //     .then(onSuccess)
    //     .catch(onError);

    return mockGetAccessToken(postObject);
}

function logoutUser(data) {

    var postObject = {
        "messageId": uuid.v4(),

        "identityToken": data
    }

    log(getServiceUrl().commandUrl, postObject);

    // return client
    //     .post(getServiceUrl().commandUrl, postObject)
    //     .then(onSuccess)
    //     .catch(onError);

    return;
}

function getUserApplications(data) {

    var postObject = {
        "messageId": uuid.v4(),

        "identityToken": data
    }

    log(getServiceUrl().queryUrl, postObject);

    // return client
    //     .post(getServiceUrl().queryUrl, postObject)
    //     .then(onSuccess)
    //     .catch(onError);

    return mockGetUserApplications(postObject);
}

const log = (url, data) => {
    console.group();
    console.log('url: ', url);
    console.log('data: ', data);
    console.groupEnd();
}

const SecurityService = {
    authenticate,
    getAccessToken,
    logoutUser,

    getUserApplications
}

export default SecurityService;

