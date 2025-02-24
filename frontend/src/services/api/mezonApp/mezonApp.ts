import { HttpResponse } from '@app/types/API.types'
import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    mezonAppControllerGetMezonAppDetail: build.query<
      MezonAppControllerGetMezonAppDetailApiResponse,
      MezonAppControllerGetMezonAppDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/mezon-app`,
        params: {
          id: queryArg.id
        }
      })
    }),
    mezonAppControllerDeleteMezonApp: build.mutation<
      MezonAppControllerDeleteMezonAppApiResponse,
      MezonAppControllerDeleteMezonAppApiArg
    >({
      query: (queryArg) => ({ url: `/api/mezon-app`, method: 'DELETE', body: queryArg.requestWithId })
    }),
    mezonAppControllerCreateMezonApp: build.mutation<
      MezonAppControllerCreateMezonAppApiResponse,
      MezonAppControllerCreateMezonAppApiArg
    >({
      query: (queryArg) => ({ url: `/api/mezon-app`, method: 'POST', body: queryArg.createMezonAppRequest })
    }),
    mezonAppControllerUpdateMezonApp: build.mutation<
      MezonAppControllerUpdateMezonAppApiResponse,
      MezonAppControllerUpdateMezonAppApiArg
    >({
      query: (queryArg) => ({ url: `/api/mezon-app`, method: 'PUT', body: queryArg.updateMezonAppRequest })
    }),
    mezonAppControllerGetRelatedMezonApp: build.query<
      MezonAppControllerGetRelatedMezonAppApiResponse,
      MezonAppControllerGetRelatedMezonAppApiArg
    >({
      query: (queryArg) => ({
        url: `/api/mezon-app/related-app`,
        params: {
          id: queryArg.id
        }
      })
    }),
    mezonAppControllerSearchMezonApp: build.query<
      MezonAppControllerSearchMezonAppApiResponse,
      MezonAppControllerSearchMezonAppApiArg
    >({
      query: (queryArg) => ({
        url: `/api/mezon-app/search`,
        params: {
          search: queryArg?.search,
          field: queryArg?.field,
          fieldId: queryArg?.fieldId,
          pageSize: queryArg.pageSize,
          pageNumber: queryArg.pageNumber,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder
        }
      })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as mezonAppService }
export type MezonAppControllerGetMezonAppDetailApiResponse = HttpResponse<GetMezonAppDetailsResponse>
export type MezonAppControllerGetMezonAppDetailApiArg = {
  id: string
}
export type MezonAppControllerDeleteMezonAppApiResponse = HttpResponse<any>
export type MezonAppControllerDeleteMezonAppApiArg = {
  requestWithId: RequestWithId
}
export type MezonAppControllerCreateMezonAppApiResponse = /** status 201  */ App
export type MezonAppControllerCreateMezonAppApiArg = {
  createMezonAppRequest: CreateMezonAppRequest
}
export type MezonAppControllerUpdateMezonAppApiResponse = /** status 200  */ App
export type MezonAppControllerUpdateMezonAppApiArg = {
  updateMezonAppRequest: UpdateMezonAppRequest
}
export type MezonAppControllerGetRelatedMezonAppApiResponse = HttpResponse<GetRelatedMezonAppResponse[]>
export type MezonAppControllerGetRelatedMezonAppApiArg = {
  id: string
}
export type MezonAppControllerSearchMezonAppApiResponse = HttpResponse<GetMezonAppDetailsResponse[]>

export type MezonAppControllerSearchMezonAppApiArg = {
  /** Keyword to search mezonApps by name or headline */
  search?: string
  /** A valid column of MezonApp (tags, ratings, socialLinks) */
  field?: string
  /** ID value of the field */
  fieldId?: string
  pageSize: number
  pageNumber: number
  sortField: string
  sortOrder: 'ASC' | 'DESC'
}
export type OwnerInMezonAppDetailResponse = {
  id: string
  name: string
}
export type TagInMezonAppDetailResponse = {
  id: string
  name: string
}
export type SocialLinkInMezonAppDetailResponse = {
  id: string
  url: string
  icon: string
}
export type GetMezonAppDetailsResponse = {
  id: string
  name: string
  description: string
  headline: string
  featuredImage: string
  owner: OwnerInMezonAppDetailResponse
  tags: TagInMezonAppDetailResponse[]
  socialLinks: SocialLinkInMezonAppDetailResponse[]
  rateScore: number
}
export type RequestWithId = {
  id: string
}
export type Tag = {
  name: string
  slug: string
  apps: App[]
}
export type LinkType = {
  name: string
  icon: string
  links: Link[]
}
export type User = {
  name: string
  email: string
  password: string
  ratings: Rating[]
}
export type Rating = {
  appId: string
  userId: string
  score: number
  comment: string
  user: User
  app: App
}
export type Developer = {
  bio: string
  socialLinks: Link[]
  name: string
  email: string
  password: string
  ratings: Rating[]
}
export type Link = {
  url: string
  linkTypeId: string
  type: LinkType
  apps: App[]
  devs: Developer[]
}
export type AppReviewHistory = {
  appId: string
  reviewer: string
  reviewedAt: string
  remark: string
  app: App
}
export type App = {
  name: string
  status: Status
  isAutoPublished: boolean
  installLink: string
  headline: string
  description: string
  prefix: string
  featuredImage: string
  ownerId: string
  supportUrl: string
  remark: string
  tags: Tag[]
  socialLinks: Link[]
  reviewHistories: AppReviewHistory[]
  ratings: Rating[]
}
export type CreateMezonAppRequest = {
  name: string
  isAutoPublished?: boolean
  installLink?: string
  headline?: string
  description?: string
  prefix?: string
  featuredImage?: string
  ownerId: string
  supportUrl?: string
  remark?: string
  tagIds?: string[]
  socialLinkIds?: string[]
}
export type UpdateMezonAppRequest = {
  id: string
  name?: string
  isAutoPublished?: boolean
  installLink?: string
  headline?: string
  description?: string
  prefix?: string
  featuredImage?: string
  supportUrl?: string
  remark?: string
  tagIds?: string[]
  socialLinkIds?: string[]
}
export type GetRelatedMezonAppResponse = {
  id: string
  name: string
  featuredImage: string
  rateScore: number
}
export enum Status {
  $0 = 0,
  $1 = 1,
  $2 = 2,
  $3 = 3
}
export const {
  useMezonAppControllerGetMezonAppDetailQuery,
  useLazyMezonAppControllerGetMezonAppDetailQuery,
  useMezonAppControllerDeleteMezonAppMutation,
  useMezonAppControllerCreateMezonAppMutation,
  useMezonAppControllerUpdateMezonAppMutation,
  useMezonAppControllerGetRelatedMezonAppQuery,
  useLazyMezonAppControllerGetRelatedMezonAppQuery,
  useMezonAppControllerSearchMezonAppQuery,
  useLazyMezonAppControllerSearchMezonAppQuery
} = injectedRtkApi
