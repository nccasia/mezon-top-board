import { Divider, Flex, Pagination, Tag } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'
import BotCard from '@app/components/BotCard/BotCard'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import Button from '@app/mtb-ui/Button'
import SingleSelect, { IOption } from '@app/mtb-ui/SingleSelect'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import { searchOption } from '@app/constants/common.constant'

const pageOptions = [5, 10, 15]
const totals = 100
function Main() {
  const [botPerPage, setBotPerPage] = useState<number>(pageOptions[0])
  const [page, setPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const botsToShow = useMemo(() => {
    const startIndex = (page - 1) * botPerPage
    const endIndex = Math.min(startIndex + botPerPage, totals)
    return Array.from({ length: endIndex - startIndex }, (_, index) => startIndex + index + 1)
  }, [page, botPerPage, totals])

  return (
    <div className={`flex flex-col justify-center pt-8 pb-12 w-[75%] m-auto`}>
      <Divider variant='solid' style={{ borderColor: 'gray' }}>
        <MtbTypography variant='h1'>Explore millions of Mezon Bots</MtbTypography>
      </Divider>
      <div className='pt-3'>
        <SearchBar data={searchOption} onSearch={(val) => console.log('Search:', val)}></SearchBar>
      </div>
      <div className={`pt-5 cursor-pointer`}>
        {Array.from({ length: 8 }, (_, index) => (
          <Tag key={index} className='!rounded-[10px]' color='#999999'>
            Tag
          </Tag>
        ))}
      </div>
      <div className='pt-8'>
        <Flex justify='space-between'>
          <div>
            <MtbTypography variant='h3'>Mezon Bots</MtbTypography>
            <MtbTypography variant='h5' weight='normal'>
              Showing 1 of 100 page
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
          <div className='flex flex-col gap-4 pt-8'>
            {botsToShow.map((botNumber) => (
              <BotCard key={botNumber} number={botNumber} />
            ))}
          </div>

          <div className='flex flex-col items-center gap-5 pt-10'>
            <div className='flex flex-col items-center relative w-full'>
              <Pagination
                onChange={handlePageChange}
                pageSize={botPerPage}
                showSizeChanger={false}
                current={page}
                total={totals}
              />

              <div className='flex justify-between w-full max-w-xs mt-2 px-4 pt-5'>
                <Button color='primary' variant='outlined' icon={<ArrowLeftOutlined />} disabled={page === 1} onClick={() => handlePageChange(1)}>
                  Older
                </Button>
                <Button color='primary' variant='solid' onClick={() => handlePageChange(page + 1)}>
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
