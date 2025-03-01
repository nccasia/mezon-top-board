import { EStorageKey } from '@app/enums'

export const storeAccessTokens = ({
  accessToken,
  refreshToken
}: {
  accessToken: string,
  refreshToken: string
}) => {
  localStorage.setItem(EStorageKey.AccessToken, accessToken)
  localStorage.setItem(EStorageKey.RefreshToken, refreshToken)
}

export const removeAccessTokens = () => {
  localStorage.removeItem(EStorageKey.AccessToken)
  localStorage.removeItem(EStorageKey.RefreshToken)
}
