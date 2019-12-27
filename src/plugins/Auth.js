var AuthPlugin = {

    setToken: function (token, expiration,Menus) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authTokenExpiration', expiration);
        localStorage.setItem('Menus', Menus);
        // localStorage.setItem('Username', Username);
    },

    destroyToken: function () {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiration');
        localStorage.removeItem('Menus');
        // localStorage.removeItem('Username');
    },

    getToken: function () {
        var token = localStorage.getItem('authToken');
        var expiration = localStorage.getItem('authTokenExpiration');
        var Menus = localStorage.getItem('Menus');
        // var Username = localStorage.getItem('Username');
        if (!token || !expiration || !Menus )
            return null;

        if (Date.now() > parseInt(expiration)) {
            this.destroyToken();
            return null;
        } else {
            return token;
        }
    },

    loggedIn: function () {
        if (this.getToken())
            return true;
        else
            return false;
    }
};

export default function(Vue) {
    Vue.auth = AuthPlugin;

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: function() {
                return Vue.auth;
            }
        }
    })
}