import avatar from '@app/assets/images/default-user.webp'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Rating } from '@app/services/api/rating/rating'
import { formatAgo } from '@app/utils/date'
import { getUrlImage } from '@app/utils/stringHelper'
function Comment({ rating }: { rating: Rating }) {
  return (
    <>
      <div className='flex gap-10 p-4 shadow-sm rounded-2xl'>
        <div className='w-15'>
          <img src={getUrlImage(rating.user?.profileImage) || avatar} alt='' className='rounded-full w-full aspect-square' />
        </div>
        <div className='flex flex-col gap-5'>
          <div>
            <MtbTypography variant='h4' customClassName='!mt-1'>{rating.user.name}</MtbTypography>
            <MtbTypography variant='p' weight='italic'>{formatAgo(rating.updatedAt)}</MtbTypography>
          </div>
          <div className='flex gap-5'>
            <MtbRate value={rating.score} readonly={true}></MtbRate>
          </div>
          <MtbTypography variant='p'>{rating.comment}</MtbTypography>
          {/* <MtbTypography variant='p'>
            <LikeOutlined /> 3,800
          </MtbTypography> */}
        </div>
      </div>
    </>
  )
}

export default Comment
