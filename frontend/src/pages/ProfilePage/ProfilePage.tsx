import CompactBotCard from '@app/components/CompactBotCard/CompactBotCard'
import { searchOption } from '@app/constants/common.constant'
import Button from '@app/mtb-ui/Button'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Divider, Tag } from 'antd'
import CardInfo from './components/CardInfo'

function ProfilePage() {
  return (
    <div className='pt-8 pb-12 w-[75%] m-auto'>
      <MtbTypography variant='h1'>Explore millions of Mezon Bots</MtbTypography>
      <div className='pt-3'>
        <SearchBar data={searchOption} onSearch={(val) => console.log('Search:', val)}></SearchBar>
      </div>
      <div className={`pt-3 cursor-pointer`}>
        {Array.from({ length: 8 }, (_, index) => (
          <Tag key={index} style={{ borderRadius: '10px' }} color='#999999'>
            Tag
          </Tag>
        ))}
      </div>
      <Divider className='bg-gray-100'></Divider>
      <div className='flex justify-between gap-15 max-lg:flex-col max-2xl:flex-col'>
        <div className='flex-1'>
          <CardInfo></CardInfo>
        </div>
        <div className='flex-2'>
          <div className='flex justify-between items-center pb-10'>
            <MtbTypography variant='h2'>Welcome to your profile</MtbTypography>
            <Button color='primary' size='large'>
              Add new bot
            </Button>
          </div>
          <div className='flex gap-8 max-lg:flex-wrap max-2xl:flex-wrap justify-center  max-lg:text-center max-2xl:text-center'>
            {Array.from({ length: 5 }, (_, index) => (
              <CompactBotCard key={index}></CompactBotCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage