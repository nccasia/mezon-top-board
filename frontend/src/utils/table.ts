import { formatDate } from './date'

export const mapDataSourceTable = <T extends Record<string, any>>(data: T[]) => {
  return data.map((item) => ({
    key: item.id || item.key,
    ...item,
    reviewedAt: item.reviewedAt ? formatDate(item.reviewedAt) : '',
    reviewer: item.reviewer || {},
    app: item.app || {}
  }))
}
