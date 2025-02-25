import { useLazyMezonAppControllerSearchMezonAppQuery } from '@app/services/api/mezonApp/mezonApp'

export const useBotSearch = (page: number, botPerPage: number) => {
  const [getBotList] = useLazyMezonAppControllerSearchMezonAppQuery()

  const handleSearch = (text: string, fieldId?: string) => {
    getBotList({
      search: text,
      field: 'tags',
      fieldId,
      pageNumber: page,
      pageSize: botPerPage,
      sortField: 'createdAt',
      sortOrder: 'DESC'
    })
  }

  return { handleSearch }
}
