export const safeConcatUrl = (baseUrl: string, path: string, params?: { [key: string]: any }) => {
  try {
    const url = new URL(baseUrl)
    url.pathname = `${url.pathname.replace(/\/$/, '')}/${encodeURIComponent(path).replace(/%2F/g, '/')}`

    if (params && typeof params === 'object') {
      Object.keys(params).forEach((key) => {
        const value = params[key]
        if (value !== undefined && value !== null) {
          url.searchParams.append(encodeURIComponent(key), encodeURIComponent(value))
        }
      })
    }

    return url.toString()
  } catch (error) {
    console.error('Invalid URL:', error)
    return null
  }
}

export const getQueryParams = (url: string) => {
  try {
    const queryString = url.split('?')[1]
    if (!queryString) {
      return {}
    }

    const queryParams: Record<string, string> = {}
    const pairs = queryString.split('&')

    pairs.forEach((pair: string) => {
      const [key, value] = pair.split('=')
      if (key) {
        queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '')
      }
    })

    return queryParams
  } catch (error) {
    console.error('Error parsing query parameters:', error)
    return {}
  }
}

export const getInvoiceHash = (payUrl?: string) => {
  if (!payUrl) return ''
  return payUrl.split('/').pop() || ''
}

export const replacePostProductionTitle = (title: string, currency: string = 'CA') => {
  if (!title) return ''

  return title.replace(new RegExp(` - ?${currency}$`), '').replace(new RegExp(`-?${currency}$`), '')
}

export const getFileNameWithoutExtension = (fileName: string) => {
  if (!fileName) return ''
  return fileName.substring(0, fileName.lastIndexOf('.'))
}

export const checkPlaceholderFile = (self_notes: string) => {
  return self_notes?.includes('placeholder file.')
}
