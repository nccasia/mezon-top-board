import { HttpResponse } from '@app/types/API.types'
import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    tagControllerGetTags: build.query<TagControllerGetTagsApiResponse, TagControllerGetTagsApiArg>({
      query: () => ({ url: `/api/tag` })
    }),
    tagControllerCreateTag: build.mutation<
          TagControllerCreateTagApiResponse,
          TagControllerCreateTagApiArg
        >({
          query: (queryArg) => ({ url: `/api/mezon-app`, method: 'POST', body: queryArg.createTagRequest })
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
export type TagControllerCreateTagApiResponse = unknown
export type TagControllerCreateTagApiArg = any
export const { useTagControllerGetTagsQuery, useLazyTagControllerGetTagsQuery } = injectedRtkApi
