import { ECookieStorageKey } from '@app/enums'

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`
}

const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (cookieName === name) return decodeURIComponent(cookieValue)
  }
  return null
}

const removeCookie = (name: ECookieStorageKey) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const getToken = (key: keyof typeof ECookieStorageKey) => {
  try {
    const json = getCookie(ECookieStorageKey[key])
    if (!json) return null
    return JSON.parse(json)
  } catch (error) {
    removeToken(key)
    return null
  }
}

export const setToken = (key: keyof typeof ECookieStorageKey, token: any) => {
  setCookie(ECookieStorageKey[key], JSON.stringify(token))
}

export const removeToken = (key: keyof typeof ECookieStorageKey) => {
  removeCookie(ECookieStorageKey[key])
}

export const storeAccessTokens = ({
  accessToken,
  refreshToken
}: {
  [key in ECookieStorageKey]: string
}) => {
  setCookie(ECookieStorageKey.AccessToken, JSON.stringify(accessToken))
  setCookie(ECookieStorageKey.RefreshToken, JSON.stringify(refreshToken))
}

export const removeAccessTokens = () => {
  removeCookie(ECookieStorageKey.AccessToken)
  removeCookie(ECookieStorageKey.RefreshToken)
}
