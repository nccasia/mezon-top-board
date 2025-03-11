import { useLazyMezonAppControllerSearchMezonAppQuery } from '@app/services/api/mezonApp/mezonApp'

export const useMezonAppSearch = (page: number, botPerPage: number) => {
  const [getBotList] = useLazyMezonAppControllerSearchMezonAppQuery()

  const handleSearch = (text: string, tagIds?: string[]) => {
    getBotList({
      search: text,
      tags: (tagIds && tagIds.length) ? tagIds : undefined,
      pageNumber: page,
      pageSize: botPerPage,
      sortField: 'createdAt',
      sortOrder: 'DESC'
    })
  }

  return { handleSearch }
}
