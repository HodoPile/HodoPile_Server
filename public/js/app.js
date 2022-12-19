"use strict"

let auth0Client = null;

// Configure Auth Client
const configureClient = async () => {
    const response = await fetch("/auth_config.json")
    const config = await response.json()
    auth0Client = await auth0.createAuth0Client({ ...config })
}

// Update UI
const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
    
    if (isAuthenticated) {
      document.getElementById("gated-content").classList.remove("hidden");
  
      document.getElementById(
        "ipt-access-token"
      ).innerHTML = await auth0Client.getTokenSilently();
  
      document.getElementById("ipt-user-profile").textContent = JSON.stringify(
        await auth0Client.getUser()
      );
  
    } else {
      document.getElementById("gated-content").classList.add("hidden");
    }
}

const login = async () => {
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
}

const logout = async () => {
    auth0Client.logout({
        logoutParams: { returnTo: window.location.origin }
    })
}

window.onload = async () => {

    await configureClient();
    updateUI()

    const isAuthenticated = await auth0Client.isAuthenticated()
    const query = window.location.search

    if( isAuthenticated ) return // show protected content
    if( query.includes("code=") && query.includes("state=") ){ 
        await auth0Client.handleRedirectCallback();
        updateUI()
        window.history.replaceState({}, document.title, "/") // redirect user, rm query params
    }

}
