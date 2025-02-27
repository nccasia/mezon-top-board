import { HttpResponse } from '@app/types/API.types'
import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    tagControllerGetTags: build.query<TagControllerGetTagsApiResponse, TagControllerGetTagsApiArg>({
      query: () => ({ url: `/api/tag` })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as tagService }
export type TagControllerGetTagsApiResponse = HttpResponse<TagResponse[]>
export type TagControllerGetTagsApiArg = void
export type TagResponse = {
  id: string
  name: string
  slug: string
}
export const { useTagControllerGetTagsQuery, useLazyTagControllerGetTagsQuery } = injectedRtkApi
