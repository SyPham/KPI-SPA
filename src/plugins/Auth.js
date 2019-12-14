var AuthPlugin = {

    setToken: function (token, expiration,menus) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authTokenExpiration', expiration);
        localStorage.setItem('menus', menus);
    },

    destroyToken: function () {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiration');
        localStorage.removeItem('menus');
    },

    getToken: function () {
        var token = localStorage.getItem('authToken');
        var expiration = localStorage.getItem('authTokenExpiration');
        var menus = localStorage.getItem('menus');
        if (!token || !expiration || !menus)
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