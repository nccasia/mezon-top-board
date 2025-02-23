import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const paramsSerializer = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()

  for (const key in params) {
    const value = params[key]

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(`${key}`, item)
      })
    } else {
      searchParams.append(key, value)
    }
  }

  return searchParams.toString()
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_ENDPOINT,
  prepareHeaders: async (headers) => {
    // const token = localStorage.getItem('accessToken')
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`)
    // }
    return headers
  },
  paramsSerializer
})

// const getBaseQueryWithReauth = (
//   baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
// ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
//   return async function (args, api, extraOptions) {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result.error && (result.error.status === 401 || result.error.data === 'Unauthorized')) {
//       const token = await getRefreshedToken()

//       if (token) {
//         api.dispatch(tokenReceived(token))
//         result = await baseQuery(args, api, extraOptions)
//       } else {
//         // refresh failed - do something like redirect to login or show a "retry" button
//         // api.dispatch(loggedOut())
//       }
//     }
//     return result
//   }
// }

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({})
})
