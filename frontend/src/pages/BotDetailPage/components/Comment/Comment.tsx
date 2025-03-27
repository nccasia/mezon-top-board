import { LikeOutlined } from '@ant-design/icons'
import avatar from '@app/assets/images/default-user.webp'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import { Rating } from '@app/services/api/rating/rating'
function Comment({rating} : {rating: Rating}) {
  return (
    <>
      <div className='flex gap-10 p-4 shadow-sm rounded-2xl'>
        <div className='w-15'>
          <img src={avatar} alt='' className='rounded-full' />
        </div>
        <div className='flex flex-col gap-3'>
          <p>{rating.user.name}</p>
          <div className='flex gap-5'>
            <MtbRate value={rating.score} readonly={true}></MtbRate>
            <p>over 4 years ago</p>
          </div>
          <p>{rating.comment}</p>
          <p>
            <LikeOutlined /> 3,800
          </p>
        </div>
      </div>
    </>
  )
}

export default Comment
