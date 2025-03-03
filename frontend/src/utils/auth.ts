export const redirectToOAuth = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''

  const authUrl =`${BACKEND_URL}/api/auth/redirect`

  window.location.href = authUrl
}
