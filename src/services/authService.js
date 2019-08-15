import Cookies from 'universal-cookie';

const cookies = new Cookies();
const ACCESS_TOKEN = 'accessToken';
const TOKEN = 'token';
const ENVIRONMENT = 'env';
const USER = 'user';

const setToken = token => cookies.set(TOKEN, token);

const getToken = () => cookies.get(TOKEN);

const removeToken = () => cookies.remove(TOKEN);

const isAuthenticated = () => {
    let token = getToken();

    if (token) {
        let tokenPart = token.split('.')[1];
        let data = JSON.parse(window.atob(tokenPart));
        const { exp } = data;

        console.warn('token going to expire at:', new Date(exp * 1000))
        
        if (exp < (new Date().getTime() / 1000)) { //token expired, clear everything
            localStorage.clear();
            AuthService.removeToken();
            return false;
        }  
        
        return true;
    }

    return false;
}

const setAccessToken = token => localStorage.setItem(ACCESS_TOKEN, token);

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

const setEnvironment = data => localStorage.setItem(ENVIRONMENT, data);

const getEnvironment = () => localStorage.getItem(ENVIRONMENT);

const setUserDetail = data => localStorage.setItem(USER, data);

const getUserDetail = () => JSON.parse(localStorage.getItem(USER)) || {};

const AuthService = {
    setAccessToken,
    getAccessToken,

    setToken,
    getToken,
    removeToken,

    isAuthenticated,

    setEnvironment,
    getEnvironment,

    setUserDetail,
    getUserDetail
}

export default AuthService;