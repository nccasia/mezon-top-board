import { HttpResponse } from '@app/types/API.types'
import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    linkTypeControllerGetAllLinks: build.query<
      LinkTypeControllerGetAllLinksApiResponse,
      LinkTypeControllerGetAllLinksApiArg
    >({
      query: () => ({ url: `/api/link-type` })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as linkTypeService }
export type LinkTypeControllerGetAllLinksApiResponse = HttpResponse<SocialLinkInMezonAppDetailResponse[]>
export type LinkTypeControllerGetAllLinksApiArg = void
export type SocialLinkInMezonAppDetailResponse = {
  id: string
  name: string
  icon: string
}
export const { useLinkTypeControllerGetAllLinksQuery, useLazyLinkTypeControllerGetAllLinksQuery } = injectedRtkApi
