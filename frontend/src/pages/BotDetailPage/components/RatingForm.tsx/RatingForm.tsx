import { useState } from 'react'
import { Form, Input } from 'antd'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import { RootState } from '@app/store'
import { IUserStore } from '@app/store/user'
import { useAppSelector } from '@app/store/hook'
import avatar from '@app/assets/images/default-user.webp'
import FormField from '@app/components/FormField/FormField'
import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Controller, useForm } from 'react-hook-form'
import { useRatingControllerCreateRatingMutation } from '@app/services/api/rating/rating'
import { toast } from 'react-toastify'

const RatingForm = ({ appId }) => {
  // const [comment, setComment] = useState<string>('')
  const { userInfo } = useAppSelector<RootState, IUserStore>((s) => s.user)
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: '',
      score: 0
    }
  })
  const [
    createRating,
    { isLoading },
  ] = useRatingControllerCreateRatingMutation()

  const onSubmit = async (data: any) => {
    try {
      const response = await createRating({ createRatingRequest: { ...data, appId } }).unwrap()
      toast.success('Successfully')
      reset()
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  return (
    <div className='flex items-start gap-8 p-4 rounded-lg'>
      <img src={avatar} alt={userInfo.name} className='w-15 h-15 rounded-full object-cover mt-1' />
      <div className='flex-1 flex flex-col gap-2'>
        <MtbTypography variant='h4'>{userInfo.name}</MtbTypography>
        <Form onFinish={handleSubmit(onSubmit)}>
          <Controller
            name="score"
            control={control}
            render={({ field }) => <MtbRate {...field} />}
          />
          <Controller
            name="comment"
            control={control}
            render={({ field }) => <Input.TextArea
              {...field}
              rows={3}
              placeholder='Write your comment...'
              className='border-gray-300 rounded-md focus:border-primary focus:ring-primary mt-3'
            />}
          />
          <Button htmlType='submit' customClassName='self-start mt-2 bg-primary hover:bg-primary-dark text-white rounded-md px-4 py-2' size='large'>
            Post Rating
          </Button>
        </Form>

      </div>
    </div>
  )
}

export default RatingForm
