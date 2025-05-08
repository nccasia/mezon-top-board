import BotCard from '@app/components/BotCard/BotCard'
import CompactBotCard from '@app/components/CompactBotCard/CompactBotCard'
import { TypographyStyle } from '@app/enums/typography.enum'
import { useMezonAppSearch } from '@app/hook/useSearch'
import MtbProgress from '@app/mtb-ui/ProgressBar/ProgressBar'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import {
  useLazyMezonAppControllerGetMezonAppDetailQuery,
  useLazyMezonAppControllerGetRelatedMezonAppQuery
} from '@app/services/api/mezonApp/mezonApp'
import { useLazyRatingControllerGetRatingsByAppQuery } from '@app/services/api/rating/rating'
import { useLazyTagControllerGetTagsQuery } from '@app/services/api/tag/tag'
import { RootState } from '@app/store'
import { IMezonAppStore } from '@app/store/mezonApp'
import { IRatingStore } from '@app/store/rating'
import { ITagStore } from '@app/store/tag'
import { ApiError } from '@app/types/API.types'
import { Carousel, Divider, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Comment from './components/Comment/Comment'
import DetailCard from './components/DetailCard/DetailCard'
import RatingForm from './components/RatingForm/RatingForm'
import useOwnershipCheck from '@app/hook/useOwnershipCheck'
import { AppStatus } from '@app/enums/AppStatus.enum'
import Button from '@app/mtb-ui/Button'
function BotDetailPage() {
  const navigate = useNavigate()
  const [getMezonAppDetail, { isError, error, isSuccess, data: getMezonAppDetailApiResponse }] = useLazyMezonAppControllerGetMezonAppDetailQuery()
  const [getrelatedMezonApp] = useLazyMezonAppControllerGetRelatedMezonAppQuery()
  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const [getRatingsByApp, { isLoading: isLoadingReview }] = useLazyRatingControllerGetRatingsByAppQuery()

  const { botId } = useParams()
  const { mezonAppDetail, relatedMezonApp } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  const { ratings } = useSelector<RootState, IRatingStore>((s) => s.rating)
  const { checkOwnership } = useOwnershipCheck();
  const ratingCounts = ratings?.data?.reduce(
    (acc, rating) => {
      acc[rating.score] = (acc[rating.score] || 0) + 1
      return acc
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>
  ) || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const { handleSearch } = useMezonAppSearch(1, 5)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (botId && botId !== 'undefined' && botId.trim() !== '') {
      getMezonAppDetail({ id: botId });
      getrelatedMezonApp({ id: botId });
      getRatingsByApp({ appId: botId });
    } else {
      navigate('/*');
    }
  }, [botId]);

  useEffect(() => {
    if (!tagList?.data?.length) {
      getTagList()
    }
  }, [])

  useEffect(() => {
    if (isError && error && isSuccess) {
      const apiError = error as ApiError
      if (mezonAppDetail.id === undefined && apiError?.status === 500) {
        navigate('/*');
      } else {
        toast.error(apiError?.data?.message);
      }
    }
  }, [isError, error]);
  useEffect(() => {
    // TODO: improve logic
    if (getMezonAppDetailApiResponse?.data && getMezonAppDetailApiResponse?.data?.status !== AppStatus.PUBLISHED) {
      checkOwnership(getMezonAppDetailApiResponse.data?.owner?.id, true);
    }
  }, [getMezonAppDetailApiResponse])

  const onLoadMore = async () => {
    if (botId && botId !== 'undefined' && botId.trim() !== '') {
      try {
        const nextPage = page + 1
        setIsLoadingMore(true)
        await getRatingsByApp({ appId: botId, pageNumber: nextPage }).unwrap()
        setPage(nextPage)
      } catch (error) {
        toast.error('Error loading more')
      } finally {
        setIsLoadingMore(false)
      }
    }
  }

  return (
    <div className='m-auto pt-10 pb-10 w-[75%]'>
      <MtbTypography>Explore milions of mezon bots</MtbTypography>
      <div className='pt-5'>
        <SearchBar
          onSearch={(val) => handleSearch(val ?? '')}
          defaultValue={searchQuery}
          isResultPage={false}
        ></SearchBar>
      </div>
      <div className='pt-5 pb-5'>
        <BotCard readonly={true} data={mezonAppDetail} canNavigateOnClick={false}></BotCard>
      </div>
      <div className='sm:flex sm:gap-10 pt-5 pb-5 sm:flex-row-reverse'>
        <div className='flex-1 sm:max-w-1/4'>
          <DetailCard></DetailCard>
        </div>
        <div className='flex-3 sm:max-w-[calc(75%-2.5rem)] max-w-full mt-7'>
          <MtbTypography variant='h3' textStyle={[TypographyStyle.UNDERLINE]}>
            Overview
          </MtbTypography>
          <Divider className='bg-gray-200'></Divider>
          <div dangerouslySetInnerHTML={{ __html: mezonAppDetail.description }} className='break-words'></div>
          <div className='pt-5'>
            <MtbTypography variant='h3'>More like this</MtbTypography>
            <Divider className='bg-gray-200'></Divider>
            {relatedMezonApp?.length > 0 ? (
              <Carousel arrows infinite={true} draggable swipeToSlide={true} touchThreshold={5} variableWidth={true} centerMode={true}
                className='text-center'>
                {relatedMezonApp.map((bot) => (
                  <div className="p-1" style={{ width: 200 }} key={bot.id}>
                    <CompactBotCard data={bot} />
                  </div>
                ))}
              </Carousel>
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
                    <p className='pt-2'>{ratings?.data?.length} reviews</p>
                  </div>
                </div>
                <p className='pt-5 max-lg:pt-7 max-2xl:pt-7'>
                  Reviews can be left only by registered users. All reviews are moderated by our moderators. Please
                  make sure to check our guidelines before posting.
                </p>
              </div>
              <div className='flex-1 flex flex-col gap-1'>
                {Object.keys(ratingCounts)
                  .reverse()
                  .map((key) => {
                    const ratingValue = Number(key)
                    const ratingCount = ratingCounts[ratingValue] || 0
                    const totalRatings = Object.values(ratingCounts).reduce((acc, count) => acc + count, 0)
                    const percent = ((ratingCount / totalRatings) * 100).toFixed(2)

                    return (
                      <div key={ratingValue} className='flex items-center gap-2 pb-2'>
                        <p className='whitespace-nowrap'>{ratingValue} stars</p>
                        <MtbProgress percent={Number(percent)} strokeColor={'red'} showInfo={false}></MtbProgress>
                        <p className='align-middle'>{ratingCount}</p>
                      </div>
                    )
                  })}
              </div>
            </div>
            <Divider className='bg-gray-200'></Divider>
            <RatingForm />
            <Divider className='bg-gray-200'></Divider>
            <div className='flex flex-col gap-5'>
              {isLoadingReview && Object.keys(ratings).length == 0 ? (
                <Spin size='large' />
              ) : (
                ratings?.data?.map((rating) => <Comment key={rating.id} rating={rating}></Comment>) || null
              )}
              {ratings.hasNextPage && <Button size='large' disabled={isLoadingMore} loading={isLoadingMore} onClick={onLoadMore}>Load More</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BotDetailPage
