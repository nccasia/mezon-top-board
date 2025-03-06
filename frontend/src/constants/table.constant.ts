import { ReviewHistoryResponse } from '@app/services/api/reviewHistory/reviewHistory'
import { formatDate } from '@app/utils/date'

export const REVIEW_HISTORY_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'App',
    key: 'app',
    render: (_: any, record: ReviewHistoryResponse) => record?.app?.name || ''
  },
  {
    title: 'Remark',
    dataIndex: 'remark',
    key: 'remark'
  },
  {
    title: 'Reviewer',
    key: 'reviewer',
    render: (_: any, record: ReviewHistoryResponse) => record?.reviewer?.name || ''
  },
  {
    title: 'Reviewed At',
    dataIndex: 'reviewedAt',
    key: 'reviewedAt',
    render: (date: string) => (date ? formatDate(date) : '')
  }
]
