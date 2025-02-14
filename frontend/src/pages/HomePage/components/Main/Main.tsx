import { Button, Divider, Flex, Input, Pagination, Select, Tag } from 'antd'
import styles from './Main.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined, SearchOutlined } from '@ant-design/icons'
import { useMemo } from 'react'
import BotCard from '@app/components/BotCard/BotCard'

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
  return (
    <div className={`flex flex-col justify-center m-auto pt-8 ${styles.main} pb-12`}>
      <Divider variant='solid' style={{ borderColor: 'gray', fontSize: '33px', fontWeight: '600' }}>
        Explore millions of Mezon Bots
      </Divider>
      <Flex gap={100}>
        <Input placeholder='Search' type='text' prefix={<SearchOutlined />} style={{ borderRadius: '50px' }}></Input>
        <Button color='default' variant='solid' size='large'>
          Search
        </Button>
      </Flex>
      <div className='pt-5'>
        {Array.from({ length: 8 }, (_, index) => (
          <Tag key={index} style={{ borderRadius: '10px'}} color='#999999'>Tag</Tag>
        ))}
      </div>
      <div className='pt-8'>
        <Flex justify='space-between'>
          <div>
            <p className='text-xl font-bold'>Mezon Bots</p>
            <p>Showing 1 of 100 page</p>
          </div>
          <Select options={options} placeholder='Select' defaultValue={pageOptions[0]} size='large'></Select>
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
                <Button icon={<ArrowLeftOutlined />}>Older</Button>
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
