import { HttpResponse } from '@app/types/API.types'
import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    linkControllerGetAllLinks: build.query<LinkControllerGetAllLinksApiResponse, LinkControllerGetAllLinksApiArg>({
      query: () => ({ url: `/api/link` })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as linkService }
export type LinkControllerGetAllLinksApiResponse = HttpResponse<SocialLinkInMezonAppDetailResponse[]>
export type LinkControllerGetAllLinksApiArg = void
export type SocialLinkInMezonAppDetailResponse = {
  id: string
  name: string
  icon: string
}
export const { useLinkControllerGetAllLinksQuery, useLazyLinkControllerGetAllLinksQuery } = injectedRtkApi
