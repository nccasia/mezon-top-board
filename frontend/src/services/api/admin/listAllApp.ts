import { api } from '../../apiInstance'
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        adminControllerGetApps: build.query({
            query: ({ search, field, fieldId, pageSize, pageNumber, sortField, sortOrder }) => ({ url: `/api/mezon-app/search`, 
                params: {
                ...(search ? { search } : {}),
                ...(field ? { field } : {}),
                ...(fieldId ? { fieldId } : {}),
                ...(pageSize ? { pageSize } : {}),
                ...(pageNumber ? { pageNumber } : {}),
                ...(sortField ? { sortField } : {}),
                ...(sortOrder ? { sortOrder } : {}),
            }
        })
        })
    })
})

export const {
    useAdminControllerGetAppsQuery
} = injectedRtkApi
