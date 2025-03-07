import { ReviewHistoryResponse } from '@app/services/api/reviewHistory/reviewHistory'
import { formatDate } from '@app/utils/date'

interface IReviewHistoryInfoProps {
  data?: ReviewHistoryResponse
}
function ReviewHistoryInfo({ data }: IReviewHistoryInfoProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between pt-3'>
        <div className='flex-1'>ID :</div>
        <div className='flex-1'>{data?.id}</div>
      </div>
      <div className='flex justify-between pt-3'>
        <div className='flex-1'>App :</div>
        <div className='flex-1'>{data?.app?.name}</div>
      </div>
      <div className='flex justify-between pt-3'>
        <div className='flex-1'>Remark :</div>
        <div className='flex-1'>{data?.remark}</div>
      </div>
      <div className='flex justify-between pt-3'>
        <div className='flex-1'>Reviewer :</div>
        <div className='flex-1'>{data?.reviewer?.name}</div>
      </div>
      <div className='flex justify-between pt-3'>
        <div className='flex-1'>Reviewed at :</div>
        <div className='flex-1'>{formatDate(data?.reviewedAt)}</div>
      </div>
    </div>
  )
}

export default ReviewHistoryInfo
