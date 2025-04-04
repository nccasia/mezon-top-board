import { GetMezonAppDetailsResponse, GetRelatedMezonAppResponse } from '@app/services/api/mezonApp/mezonApp'

export interface IBotCardProps {
  readonly?: boolean
  data?: GetMezonAppDetailsResponse
}

export interface ISocialLinksData {
  icon: string
  name: string
  url: string
  id: string
}

export interface ICompactBotCardProps {
  data?: GetRelatedMezonAppResponse
}

export interface IAddBotFormProps {
  onResetAvatar : () => void
}
