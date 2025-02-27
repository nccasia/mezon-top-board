export const redirectToOAuth = () => {
  const OAUTH2_AUTHORIZE_URL = process.env.REACT_APP_OAUTH2_AUTHORIZE_URL || ''
  const CLIENT_ID = process.env.REACT_APP_OAUTH2_CLIENT_ID
  const REDIRECT_URI = process.env.REACT_APP_OAUTH2_REDIRECT_URI || ''
  const RESPONSE_TYPE = process.env.REACT_APP_OAUTH2_RESPONSE_TYPE
  const SCOPE = process.env.REACT_APP_OAUTH2_SCOPE
  const STATE = Math.random().toString(36).substring(2, 15)

  sessionStorage.setItem('oauth_state', STATE)

  const authUrl =
    `${OAUTH2_AUTHORIZE_URL}?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=${RESPONSE_TYPE}&` +
    `scope=${SCOPE}&` +
    `state=${STATE}`

  window.location.href = authUrl
}
