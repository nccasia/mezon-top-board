import { HttpResponse } from '@app/types/API.types'
import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    userControllerSearchUser: build.query<UserControllerSearchUserApiResponse, UserControllerSearchUserApiArg>({
      query: (queryArg) => ({
        url: `/api/user`,
        params: {
          search: queryArg.search,
          pageSize: queryArg.pageSize,
          pageNumber: queryArg.pageNumber,
          sortField: queryArg.sortField,
          sortOrder: queryArg.sortOrder
        }
      })
    }),
    userControllerUpdateUser: build.mutation<UserControllerUpdateUserApiResponse, UserControllerUpdateUserApiArg>({
      query: (queryArg) => ({ url: `/api/user`, method: 'PUT', body: queryArg.updateUserRequest })
    }),
    userControllerDeleteUser: build.mutation<UserControllerDeleteUserApiResponse, UserControllerDeleteUserApiArg>({
      query: (queryArg) => ({ url: `/api/user`, method: 'DELETE', body: queryArg.requestWithId })
    }),
    userControllerGetUserDetails: build.query<
      UserControllerGetUserDetailsApiResponse,
      UserControllerGetUserDetailsApiArg
    >({
      query: () => ({ url: `/api/user/me` })
    }),
    userControllerSelfUpdateUser: build.mutation<
      UserControllerSelfUpdateUserApiResponse,
      UserControllerSelfUpdateUserApiArg
    >({
      query: (queryArg) => ({ url: `/api/user/self-update`, method: 'PUT', body: queryArg.selfUpdateUserRequest })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as userService }
export type UserControllerSearchUserApiResponse = unknown
export type UserControllerSearchUserApiArg = {
  /** Keyword to search user by name or email */
  search?: string
  pageSize: number
  pageNumber: number
  sortField: string
  sortOrder: 'ASC' | 'DESC'
}
export type UserControllerUpdateUserApiResponse = unknown
export type UserControllerUpdateUserApiArg = {
  updateUserRequest: UpdateUserRequest
}
export type UserControllerDeleteUserApiResponse = unknown
export type UserControllerDeleteUserApiArg = {
  requestWithId: RequestWithId
}
export type UserControllerGetUserDetailsApiResponse = HttpResponse<GetUserDetailsResponse>
export type UserControllerGetUserDetailsApiArg = void
export type UserControllerSelfUpdateUserApiResponse = unknown
export type UserControllerSelfUpdateUserApiArg = {
  selfUpdateUserRequest: SelfUpdateUserRequest
}
export type SearchUserResponse = {
  id: string
  name: string
  email: string
  bio: string
  role: string
}
export type UpdateUserRequest = {
  id: string
  name?: string
  bio?: string
}
export type RequestWithId = {
  id: string
}
export type GetUserDetailsResponse = {
  id: string
  name: string
  email: string
  bio: string
}
export type SelfUpdateUserRequest = {
  name?: string
  bio?: string
}
export const {
  useUserControllerSearchUserQuery,
  useLazyUserControllerSearchUserQuery,
  useUserControllerUpdateUserMutation,
  useUserControllerDeleteUserMutation,
  useUserControllerGetUserDetailsQuery,
  useLazyUserControllerGetUserDetailsQuery,
  useUserControllerSelfUpdateUserMutation
} = injectedRtkApi
