import FormField from '@app/components/FormField/FormField'
import { useMezonAppSearch } from '@app/hook/useSearch'
import Button from '@app/mtb-ui/Button'
import SearchBar from '@app/mtb-ui/SearchBar/SearchBar'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { useMediaControllerCreateMediaMutation } from '@app/services/api/media/media'
import { useUserControllerSelfUpdateUserMutation } from '@app/services/api/user/user'
import { RootState } from '@app/store'
import { useAppSelector } from '@app/store/hook'
import { IUserStore } from '@app/store/user'
import { Divider, Form, Input, Upload } from 'antd'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import CardInfo from './components/CardInfo'

function SettingPage() {
  const { userInfo } = useAppSelector<RootState, IUserStore>((s) => s.user)
  const [selfUpdate, { isLoading: isUpdating }] = useUserControllerSelfUpdateUserMutation()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      bio: ''
    }
  })

  useEffect(() => {
    reset({
      name: userInfo?.name || '',
      bio: userInfo?.bio || ''
    })
  }, [userInfo, reset])

  const { handleSearch } = useMezonAppSearch(1, 5)

  const onSubmit = async (data: any) => {
    try {
      await selfUpdate({ selfUpdateUserRequest: { ...data } }).unwrap()
      toast.success('Update successfully')
    } catch (error) {
      toast.error('Update failed. Please try again.')
    }
  }

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
            <MtbTypography variant='h2'>Profile's setting page</MtbTypography>
          </div>
          <div>
            <Form onFinish={handleSubmit(onSubmit)}>
              <FormField label='Name' description='Your name'>
                <Controller
                  control={control}
                  name='name'
                  render={({ field }) => <Input {...field} placeholder='Your name' />}
                />
              </FormField>
              <FormField label='Bio' description='Your bio'>
                <Controller
                  control={control}
                  name='bio'
                  render={({ field }) => <Input {...field} placeholder='Your bio' />}
                />
              </FormField>
              <div className='flex items-center justify-center'>
                <Button htmlType='submit' customClassName='w-[200px] mt-5' loading={isUpdating} disabled={isUpdating}>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SettingPage
