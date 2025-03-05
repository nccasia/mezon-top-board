import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    reviewHistoryControllerGetAppReviews: build.query<
      ReviewHistoryControllerGetAppReviewsApiResponse,
      ReviewHistoryControllerGetAppReviewsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/review-history`,
        params: {
          appId: queryArg.appId,
          pageSize: queryArg.pageSize,
          pageNumber: queryArg.pageNumber,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder
        }
      })
    }),
    reviewHistoryControllerCreateAppReview: build.mutation<
      ReviewHistoryControllerCreateAppReviewApiResponse,
      ReviewHistoryControllerCreateAppReviewApiArg
    >({
      query: (queryArg) => ({ url: `/api/review-history`, method: 'POST', body: queryArg.createAppReviewRequest })
    }),
    reviewHistoryControllerUpdateAppReview: build.mutation<
      ReviewHistoryControllerUpdateAppReviewApiResponse,
      ReviewHistoryControllerUpdateAppReviewApiArg
    >({
      query: (queryArg) => ({ url: `/api/review-history`, method: 'PUT', body: queryArg.updateAppReviewRequest })
    }),
    reviewHistoryControllerDeleteAppReview: build.mutation<
      ReviewHistoryControllerDeleteAppReviewApiResponse,
      ReviewHistoryControllerDeleteAppReviewApiArg
    >({
      query: (queryArg) => ({ url: `/api/review-history`, method: 'DELETE', body: queryArg.requestWithId })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as reviewHistoryService }
export type ReviewHistoryControllerGetAppReviewsApiResponse = unknown
export type ReviewHistoryControllerGetAppReviewsApiArg = {
  appId?: string
  pageSize: number
  pageNumber: number
  sortField: string
  sortOrder: 'ASC' | 'DESC'
}
export type ReviewHistoryControllerCreateAppReviewApiResponse = unknown
export type ReviewHistoryControllerCreateAppReviewApiArg = {
  createAppReviewRequest: CreateAppReviewRequest
}
export type ReviewHistoryControllerUpdateAppReviewApiResponse = unknown
export type ReviewHistoryControllerUpdateAppReviewApiArg = {
  updateAppReviewRequest: UpdateAppReviewRequest
}
export type ReviewHistoryControllerDeleteAppReviewApiResponse = unknown
export type ReviewHistoryControllerDeleteAppReviewApiArg = {
  requestWithId: RequestWithId
}
export type CreateAppReviewRequest = {
  appId: string
  isApproved: boolean
  remark: string
}
export type UpdateAppReviewRequest = {
  id: string
  remark: string
}
export type RequestWithId = {
  id: string
}
export const {
  useReviewHistoryControllerGetAppReviewsQuery,
  useLazyReviewHistoryControllerGetAppReviewsQuery,
  useReviewHistoryControllerCreateAppReviewMutation,
  useReviewHistoryControllerUpdateAppReviewMutation,
  useReviewHistoryControllerDeleteAppReviewMutation
} = injectedRtkApi
