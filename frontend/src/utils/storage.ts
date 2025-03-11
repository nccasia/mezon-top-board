import { EStorageKey } from '@app/enums'

export const storeAccessTokens = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem(EStorageKey.AccessToken, accessToken)
  localStorage.setItem(EStorageKey.RefreshToken, refreshToken)
}

export const getAccessTokens = () => {
  return localStorage.getItem(EStorageKey.AccessToken)
}

export const getRefreshTokens = () => {
  return localStorage.getItem(EStorageKey.RefreshToken)
}

export const removeAccessTokens = () => {
  localStorage.removeItem(EStorageKey.AccessToken)
  localStorage.removeItem(EStorageKey.RefreshToken)
}
