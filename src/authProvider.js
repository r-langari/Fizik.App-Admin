import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
    // called when the user attempts to log in

    if (type === AUTH_LOGIN) {
        var _navigator = {};
		for (var i in navigator) _navigator[i] = navigator[i];
		let ns = JSON.stringify(_navigator);
        const { password, username } = params;
        let data = {
            mobile : username,
            password : password,
            navigatorStringify: ns
        }
        const request = new Request(process.env.REACT_APP_API_URL+'/users/authenticate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((result) => {
            if (result.auth && result.userinfo.isAdmin) {
                localStorage.setItem('token', result.token);
                Promise.resolve();
            } else {
                    Promise.reject();
                }
            });
        
    }
    
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};