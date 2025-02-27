import { safeConcatUrl } from '../utils/stringHelper'
import type { ConfigFile } from '@rtk-query/codegen-openapi'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '../../.env'
})

console.log('first', process.env.REACT_APP_BACKEND_ENDPOINT)

const schemaUrl = safeConcatUrl(process.env.REACT_APP_BACKEND_ENDPOINT ?? '', 'api/openApi.json') as string

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
    './api/media/media.ts': {
      filterEndpoints: filterByTag('Media'),
      exportName: 'mediaService'
    },
    './api/auth/auth.ts': {
      filterEndpoints: filterByTag('Auth'),
      exportName: 'authService'
    }
  },

  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true
  }
}

export default config
