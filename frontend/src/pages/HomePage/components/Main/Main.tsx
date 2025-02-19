import { Divider, Flex, Pagination, Tag } from 'antd'
import styles from './Main.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useMemo } from 'react'
import BotCard from '@app/components/BotCard/BotCard'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import Button from '@app/mtb-ui/Button'
import SingleSelect, { IOption } from '@app/mtb-ui/SingleSelect'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import { searchOption } from '@app/constants/common.constant'

const pageOptions = [5, 10, 15]
function Main() {
  const options = useMemo(() => {
    return pageOptions.map((value) => {
      return {
        value,
        label: `${value} bots/page`
      }
    })
  }, [])
  const handlePageSizeChange = (option: IOption) => {
    console.log('item per page', option)
  }
  return (
    <div className={`flex flex-col justify-center m-auto pt-8 ${styles.main} pb-12`}>
      <Divider variant='solid' style={{ borderColor: 'gray' }}>
        <MtbTypography variant='h1'>Explore millions of Mezon Bots</MtbTypography>
      </Divider>
      <div className='pt-3'>
          <SearchBar data={searchOption} onSearch={(val) => console.log('Search:', val)}></SearchBar>
      </div>
      <div className={`pt-5 ${styles['main-search-tag']}`}>
        {Array.from({ length: 8 }, (_, index) => (
          <Tag key={index} style={{ borderRadius: '10px' }} color='#999999'>
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
            defaultValue={options[2]}
          />
        </Flex>
        <div>
          <div className='flex flex-col gap-4 pt-8'>
            {Array.from({ length: 5 }, (_, index) => (
              <BotCard key={index}></BotCard>
            ))}
          </div>

          <div className='flex flex-col items-center gap-5 pt-10'>
            <div className='flex flex-col items-center relative w-full'>
              <Pagination defaultCurrent={1} total={50} />

              <div className='flex justify-between w-full max-w-xs mt-2 px-4 pt-5'>
                <Button color='primary' icon={<ArrowLeftOutlined />}>
                  Older
                </Button>
                <Button color='primary' variant='outlined'>
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
