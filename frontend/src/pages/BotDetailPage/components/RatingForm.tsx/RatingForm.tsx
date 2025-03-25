import { useState } from 'react'
import { Input } from 'antd'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import { RootState } from '@app/store'
import { IUserStore } from '@app/store/user'
import { useAppSelector } from '@app/store/hook'
import avatar from '@app/assets/images/default-user.webp'
import FormField from '@app/components/FormField/FormField'
import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'

const RatingForm = () => {
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const { userInfo } = useAppSelector<RootState, IUserStore>((s) => s.user)

  const handleSubmit = () => {
    if (!comment.trim()) return
    setComment('')
    setRating(0) // Reset after submission
  }

  return (
    <div className='flex items-start gap-8 p-4 rounded-lg'>
      <img src={avatar} alt={userInfo.name} className='w-15 h-15 rounded-full object-cover mt-1' />
      <div className='flex-1 flex flex-col gap-2'>
        <MtbTypography variant='h4'>{userInfo.name}</MtbTypography>
        <MtbRate value={rating} onChange={setRating} />
        <Input.TextArea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Write your comment...'
          className='border-gray-300 rounded-md focus:border-primary focus:ring-primary'
        />
        <Button customClassName='self-start mt-2 bg-primary hover:bg-primary-dark text-white rounded-md px-4 py-2' size='large'>
          Post Review
        </Button>
      </div>
    </div>
  )
}

export default RatingForm
