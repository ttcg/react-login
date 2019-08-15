import axios from 'axios';
import uuid from 'uuid';
import getServiceUrl from './serviceUrl'

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

    // return client
    //     .post(getServiceUrl().commandUrl, postObject)
    //     .then(onSuccess)
    //     .catch(onError);

    return fakeAuthenticate(data);
}

function getAccessToken(data) {

    var postObject = {
        "messageId": uuid.v4(),

        "token": data
    }

    return client
        .post(getServiceUrl().commandUrl, postObject)
        .then(onSuccess)
        .catch(onError);
}

function logoutUser(data) {

    var postObject = {
        "messageId": uuid.v4(),

        "identityToken": data
    }

    return client
        .post(getServiceUrl().commandUrl, postObject)
        .then(onSuccess)
        .catch(onError);
}

function getUserApplications(data) {

    var postObject = {
        "messageId": uuid.v4(),

        "identityToken": data
    }

    return client
        .post(getServiceUrl().queryUrl, postObject)
        .then(onSuccess)
        .catch(onError);
}

const SecurityService = {
    authenticate,
    getAccessToken,
    logoutUser,

    getUserApplications
}

export default SecurityService;

function fakeAuthenticate(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email === "ttcg@gmail.com" && data.password === "ttcgreact") {
                return resolve({
                    succeeded: true,
                    token: 'ttcg12345'
                })
            }
            else {
                return resolve({
                    succeeded: false
                })
            }
        }, 1000)
    })
}