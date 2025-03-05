import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    mediaControllerGetAllMedia: build.query<MediaControllerGetAllMediaApiResponse, MediaControllerGetAllMediaApiArg>({
      query: (queryArg) => ({
        url: `/api/media/search`,
        params: {
          pageSize: queryArg.pageSize,
          pageNumber: queryArg.pageNumber,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder
        }
      })
    }),
    mediaControllerGetMedia: build.query<MediaControllerGetMediaApiResponse, MediaControllerGetMediaApiArg>({
      query: (queryArg) => ({
        url: `/api/media`,
        params: {
          id: queryArg.id
        }
      })
    }),
    mediaControllerCreateMedia: build.mutation<MediaControllerCreateMediaApiResponse, MediaControllerCreateMediaApiArg>(
      {
        query: (queryArg) => ({ url: `/api/media`, method: 'POST', body: queryArg.createMediaRequest })
      }
    ),
    mediaControllerDeleteMedia: build.mutation<MediaControllerDeleteMediaApiResponse, MediaControllerDeleteMediaApiArg>(
      {
        query: (queryArg) => ({ url: `/api/media`, method: 'DELETE', body: queryArg.deleteMediaRequest })
      }
    )
  }),
  overrideExisting: false
})
export { injectedRtkApi as mediaService }
export type MediaControllerGetAllMediaApiResponse = unknown
export type MediaControllerGetAllMediaApiArg = {
  pageSize: number
  pageNumber: number
  sortField: string
  sortOrder: 'ASC' | 'DESC'
}
export type MediaControllerGetMediaApiResponse = unknown
export type MediaControllerGetMediaApiArg = {
  id: string
}
export type MediaControllerCreateMediaApiResponse = unknown
export type MediaControllerCreateMediaApiArg = {
  createMediaRequest: CreateMediaRequest
}
export type MediaControllerDeleteMediaApiResponse = unknown
export type MediaControllerDeleteMediaApiArg = {
  deleteMediaRequest: DeleteMediaRequest
}
export type CreateMediaRequest = {
  file: Blob
}
export type DeleteMediaRequest = {
  id: string
}
export const {
  useMediaControllerGetAllMediaQuery,
  useLazyMediaControllerGetAllMediaQuery,
  useMediaControllerGetMediaQuery,
  useLazyMediaControllerGetMediaQuery,
  useMediaControllerCreateMediaMutation,
  useMediaControllerDeleteMediaMutation
} = injectedRtkApi
