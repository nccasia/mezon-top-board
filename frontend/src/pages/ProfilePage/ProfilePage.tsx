import CompactBotCard from '@app/components/CompactBotCard/CompactBotCard'
import { useMezonAppSearch } from '@app/hook/useSearch'
import Button from '@app/mtb-ui/Button'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { useLazyMezonAppControllerGetMyAppQuery } from '@app/services/api/mezonApp/mezonApp'
import { useLazyTagControllerGetTagsQuery } from '@app/services/api/tag/tag'
import { RootState } from '@app/store'
import { IAuthStore } from '@app/store/auth'
import { IMezonAppStore } from '@app/store/mezonApp'
import { Divider } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardInfo from './components/CardInfo'

function ProfilePage() {
  const navigate = useNavigate()
  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const { handleSearch } = useMezonAppSearch(1, 5)
  const [getMyApp] = useLazyMezonAppControllerGetMyAppQuery()
  const { mezonAppOfUser } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  const { isLogin } = useSelector<RootState, IAuthStore>((s) => s.auth)

  const getData = async () => {
    await getTagList()
    if (isLogin) {
      getMyApp({
        pageNumber: 1,
        pageSize: 5,
        sortField: 'createdAt',
        sortOrder: 'DESC'
      })
    }
  }

  useEffect(() => {
    if (!isLogin) {
      navigate('/')
      return
    }

    getData()
  }, [isLogin])

  return (
    <div className='pt-8 pb-12 w-[75%] m-auto'>
      <MtbTypography variant='h1'>Explore millions of Mezon Bots</MtbTypography>
      <div className='pt-3'>
        <SearchBar onSearch={(val, tagIds) => handleSearch(val ?? '', tagIds)} isResultPage={false}></SearchBar>
      </div>
      <Divider className='bg-gray-100'></Divider>
      <div className='flex justify-between gap-15 max-lg:flex-col max-2xl:flex-col'>
        <div className='flex-1'>
          <CardInfo></CardInfo>
        </div>
        <div className='flex-2'>
          <div className='flex justify-between items-center pb-10'>
            <MtbTypography variant='h2'>Welcome to your profile</MtbTypography>
            <Button color='primary' size='large' onClick={() => navigate('/new-bot')}>
              Add new bot
            </Button>
          </div>
          <div className='flex gap-8 max-lg:flex-wrap max-2xl:flex-wrap justify-center  max-lg:text-center max-2xl:text-center'>
            {mezonAppOfUser?.data?.map((item) => <CompactBotCard key={item.id} data={item}></CompactBotCard>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
