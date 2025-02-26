import { Tag, Divider } from 'antd'
import BotCard from '@app/components/BotCard/BotCard'
import DetailCard from './components/DetailCard/DetailCard'
import CompactBotCard from '@app/components/CompactBotCard/CompactBotCard'
import { ratings } from '@app/constants/common.constant'
import Comment from './components/Comment/Comment'
import MtbProgress from '@app/mtb-ui/ProgressBar/ProgressBar'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { TypographyStyle } from '@app/enums/typography.enum'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import {
  useLazyMezonAppControllerGetMezonAppDetailQuery,
  useLazyMezonAppControllerGetRelatedMezonAppQuery
} from '@app/services/api/mezonApp/mezonApp'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IMezonAppStore } from '@app/store/mezonApp'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import { ITagStore } from '@app/store/tag'
import { useLazyTagControllerGetTagsQuery } from '@app/services/api/tag/tag'
import { useMezonAppSearch } from '@app/hook/useSearch'
import { ApiError } from '@app/types/API.types'
import { toast } from 'react-toastify'
function BotDetailPage() {
  const [getMezonAppDetail, {isError, error}] = useLazyMezonAppControllerGetMezonAppDetailQuery()
  const [getrelatedMezonApp] = useLazyMezonAppControllerGetRelatedMezonAppQuery()
  const [getTagList] = useLazyTagControllerGetTagsQuery()

  const { botId } = useParams()
  const { mezonAppDetail, relatedMezonApp } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const { handleSearch } = useMezonAppSearch(1, 5)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  useEffect(() => {
    if (botId) {
      getMezonAppDetail({ id: botId })
      getrelatedMezonApp({ id: botId })
    }
  }, [botId])

  useEffect(() => {
    if (!tagList?.data?.length) {
      getTagList()
    }
  }, [tagList])

  useEffect(() => {
    if (isError && error) {
      const apiError = error as ApiError
      toast.error(apiError?.data?.message[0])
    }
  }, [isError, error])
  return (
    <div className='m-auto pt-10 pb-10 w-[75%]'>
      <MtbTypography>Explore milions of mezon bots</MtbTypography>
      <div className='pt-5'>
        <SearchBar onSearch={(val) => handleSearch(val ?? '')} defaultValue={searchQuery}></SearchBar>
      </div>
      <div className='pt-5 pb-5'>
        <BotCard readonly={true} data={mezonAppDetail}></BotCard>
      </div>
      <MtbTypography variant='h3' textStyle={[TypographyStyle.UNDERLINE]}>
        Overview
      </MtbTypography>
      <div className='flex gap-10 pt-5 pb-5'>
        <div className='flex-3'>
          <p className='text-justify'>{mezonAppDetail.description}</p>
          <div className='pt-5'>
            <MtbTypography variant='h3'>More like this</MtbTypography>
            <Divider className='bg-gray-200'></Divider>
            {relatedMezonApp?.length > 0 ? (
              <div className='flex gap-10 items-center max-lg:text-center max-2xl:text-center max-lg:flex-wrap max-2xl:flex-wrap max-lg:justify-center max-2xl:justify-center'>
                {relatedMezonApp.map((bot) => (
                  <CompactBotCard key={bot.id} data={bot} />
                ))}
              </div>
            ) : (
              <MtbTypography variant='h4' weight='normal' customClassName='!text-gray-500 !text-center !block'>
                No related bot
              </MtbTypography>
            )}
          </div>
          <div className='pt-8'>
            <MtbTypography variant='h3'>Ratings & Reviews</MtbTypography>
            <Divider className='bg-gray-200'></Divider>
            <div className='flex justify-between gap-4 max-lg:flex-col max-2xl:flex-col'>
              <div className='flex-1'>
                <div className='flex items-center gap-10 max-lg:justify-between max-2xl:justify-between'>
                  <p className='text-6xl'>{mezonAppDetail.rateScore}</p>
                  <div>
                    <MtbRate readonly={true} value={mezonAppDetail.rateScore}></MtbRate>
                    <p className='pt-2'>9,160 reviews</p>
                  </div>
                </div>
                <p className='pt-5 max-lg:pt-7 max-2xl:pt-7'>
                  Reviews can be left only by registered users. All reviews are moderated by Top.gg moderators. Please
                  make sure to check our guidelines before posting.
                </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                {ratings.map((rating) => (
                  <div key={rating.stars} className='flex items-center gap-2 pb-2'>
                    <p className='whitespace-nowrap'>{rating.stars} stars</p>
                    <MtbProgress percent={rating.percent} strokeColor={'red'} showInfo={false}></MtbProgress>
                    <p className='align-middle'>{rating.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <Divider className='bg-gray-200'></Divider>
            <div className='flex flex-col gap-5'>
              {Array.from({ length: 5 }, (_, index) => (
                <Comment key={index}></Comment>
              ))}
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <DetailCard></DetailCard>
        </div>
      </div>
    </div>
  )
}

export default BotDetailPage
