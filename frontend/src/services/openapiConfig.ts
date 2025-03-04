import { safeConcatUrl } from '../utils/stringHelper'
import type { ConfigFile } from '@rtk-query/codegen-openapi'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '../../.env'
})

const schemaUrl = safeConcatUrl(process.env.REACT_APP_BACKEND_URL ?? '', 'api/openApi.json') as string

const filterByTag = (tag: string) => {
  const matcher = (name: string, operationDefinition: any) => {
    if (!operationDefinition.operation.tags) return false

    return operationDefinition.operation.tags.includes(tag)
  }

  return matcher
}

const config: ConfigFile = {
  schemaFile: schemaUrl,
  apiFile: './apiInstance.ts',
  apiImport: 'api',
  useEnumType: true,
  outputFiles: {
    // UNCOMMENT TO ENABLE SERVICE GENERATION
    // './api/media/media.ts': {
    //   filterEndpoints: filterByTag('Media'),
    //   exportName: 'mediaService'
    // },
    // './api/auth/auth.ts': {
    //   filterEndpoints: filterByTag('Auth'),
    //   exportName: 'authService'
    // },
    // './api/tag/tag.ts': {
    //   filterEndpoints: filterByTag('Tag'),
    //   exportName: 'tagService'
    // },
    // './api/mezonApp/mezonApp.ts': {
    //   filterEndpoints: filterByTag('MezonApp'),
    //   exportName: 'tagService'
    // },
    // './api/link/link.ts': {
    //   filterEndpoints: filterByTag('Link'),
    //   exportName: 'linkService'
    // },
    // './api/user/user.ts': {
    //   filterEndpoints: filterByTag('User'),
    //   exportName: 'userService'
    // },
  },

  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true
  }
}

export default config
