window.authContext = new AuthenticationContext(configOptions)

var isCallback = authContext.isCallback(window.location.hash)
authContext.handleWindowCallback()

// If this is a callback page, get the id_token and store it in a cookie
if(isCallback) {
    var id_token = null
    var key = authContext.CONSTANTS.STORAGE.IDTOKEN
    var obj = authContext.config
    if(obj && obj.cacheLocation && obj.cacheLocation == 'localStorage') {
        id_token = localStorage.getItem(key)
    }
    else {
        id_token = sessionStorage.getItem(key)
    }

    // If we have an id_token, save it in the cookie so we can authenticate the user in Nginx
    if(id_token) {
        Cookies.set('auth_token', id_token)
        window.location.href = configOptions.postLoginRedirectUri
    }
}

// Perform login when clicking on the button
document.getElementById('loginBtn').addEventListener('click', function(event) {
    event.preventDefault()
    authContext.login()
})
