import { Divider, Flex, Pagination, Tag } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import BotCard from '@app/components/BotCard/BotCard'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import Button from '@app/mtb-ui/Button'
import SingleSelect, { IOption } from '@app/mtb-ui/SingleSelect'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import { useLazyTagControllerGetTagsQuery } from '@app/services/api/tag/tag'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { useLazyMezonAppControllerSearchMezonAppQuery } from '@app/services/api/mezonApp/mezonApp'
import { IMezonAppStore } from '@app/store/mezonApp'
import { useBotSearch } from '@app/hook/useSearch'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ApiError } from '@app/types/API.types'
import { IMainProps } from '@app/types/Main.type'

const pageOptions = [5, 10, 15]
function Main({ isSearchPage = false }: IMainProps) {
  const [botPerPage, setBotPerPage] = useState<number>(pageOptions[0])
  const [page, setPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const [getMezonApp, { isError, error }] = useLazyMezonAppControllerSearchMezonAppQuery()
  const { mezonApp } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  const totals = useMemo(() => mezonApp.totalCount || 0, [mezonApp])
  const { handleSearch } = useBotSearch(page, botPerPage)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    getTagList()
  }, [])

  useEffect(() => {
    if (isError && error) {
      const apiError = error as ApiError
      toast.error(apiError?.data?.message[0])
    }
  }, [isError, error])

  useEffect(() => {
    getMezonApp({
      search: isSearchPage ? searchQuery : undefined,
      field: isSearchPage ? 'tags' : undefined,
      pageNumber: page,
      pageSize: botPerPage,
      sortField: 'createdAt',
      sortOrder: 'DESC'
    })
  }, [page, botPerPage, searchQuery])

  const options = useMemo(() => {
    return pageOptions.map((value) => {
      return {
        value,
        label: `${value} bots/page`
      }
    })
  }, [])

  const handlePageSizeChange = (option: IOption) => {
    setBotPerPage(Number(option.value))
    setPage(1)
    setIsOpen(false)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    if (newPage > Math.ceil(totals / botPerPage)) {
      setPage(1)
    }
  }

  return (
    <div className={`flex flex-col justify-center pt-8 pb-12 w-[75%] m-auto`}>
      <Divider variant='solid' style={{ borderColor: 'gray' }}>
        <MtbTypography variant='h1'>Explore millions of Mezon Bots</MtbTypography>
      </Divider>
      <div className='pt-3'>
        <SearchBar
          onSearch={(val, tagId) => handleSearch(val ?? '', tagId)}
          defaultValue={searchQuery}
          isResultPage={isSearchPage}
        ></SearchBar>
      </div>
      <div className='pt-8'>
        <Flex justify='space-between'>
          <div>
            <MtbTypography variant='h3'>Mezon Bots</MtbTypography>
            <MtbTypography variant='h5' weight='normal'>
              Showing 1 of {mezonApp.totalPages} page
            </MtbTypography>
          </div>
          <SingleSelect
            onChange={handlePageSizeChange}
            options={options}
            placeholder='Select'
            size='large'
            className='w-[13rem]'
            dropDownTitle='Title'
            defaultValue={options[0]}
            onDropdownVisibleChange={(visible) => setIsOpen(visible)}
            open={isOpen}
          />
        </Flex>
        <div>
          {mezonApp?.data?.length !== 0 ? (
            <div className='flex flex-col gap-4 pt-8'>
              {mezonApp?.data?.map((bot) => <BotCard key={bot.id} data={bot} />)}
            </div>
          ) : (
            <MtbTypography variant='h4' weight='normal' customClassName='!text-center !block !text-gray-500'>
              No result
            </MtbTypography>
          )}
          <div className='flex flex-col items-center gap-5 pt-10'>
            <div className='flex flex-col items-center relative w-full'>
              <Pagination
                onChange={handlePageChange}
                pageSize={botPerPage}
                showSizeChanger={false}
                current={page}
                total={mezonApp?.pageNumber}
              />

              <div className='flex justify-between w-full max-w-xs mt-2 px-4 pt-5'>
                <Button
                  color='primary'
                  variant='outlined'
                  icon={<ArrowLeftOutlined />}
                  disabled={page === 1}
                  onClick={() => handlePageChange(1)}
                >
                  Older
                </Button>
                <Button
                  color='primary'
                  variant='solid'
                  onClick={() => handlePageChange(page + 1)}
                  disabled={mezonApp.totalPages === 1}
                >
                  Newer <ArrowRightOutlined />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
