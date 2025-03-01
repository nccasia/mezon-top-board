export const redirectToOAuth = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''
  const STATE = Math.random().toString(36).substring(2, 15)

  sessionStorage.setItem('oauth_state', STATE)

  const authUrl =`${BACKEND_URL}/api/auth/redirect?state=${STATE}`

  window.location.href = authUrl
}
