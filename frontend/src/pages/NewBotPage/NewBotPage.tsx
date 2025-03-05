import avatarDefault from '@app/assets/images/0e54d87446f106d1fd58385295ae9deb.png'
import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Upload, UploadProps } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AddBotForm from './components/AddBotForm/AddBotForm'
import { useLazyTagControllerGetTagsQuery } from '@app/services/api/tag/tag'
import { FormProvider, useForm } from 'react-hook-form'
import { CreateMezonAppRequest } from '@app/services/api/mezonApp/mezonApp'
import { yupResolver } from '@hookform/resolvers/yup'
import { ADD_BOT_SCHEMA } from '@app/validations/addBot.validations'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IUserStore } from '@app/store/user'
import { useLazyUserControllerGetUserDetailsQuery } from '@app/services/api/user/user'
import { isEmpty } from 'lodash'
import { ITagStore } from '@app/store/tag'
import { useLazyLinkTypeControllerGetAllLinksQuery } from '@app/services/api/linkType/linkType'
function NewBotPage() {
  const [avatar, setAvatar] = useState<string>(avatarDefault)
  const { userInfo } = useSelector<RootState, IUserStore>((s) => s.user)
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const methods = useForm<CreateMezonAppRequest>({
    defaultValues: {
      name: '',
      isAutoPublished: false,
      ownerId: userInfo?.id,
      socialLinkIds: []
    },
    resolver: yupResolver(ADD_BOT_SCHEMA)
  })

  const { setValue } = methods

  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const [getSocialLink] = useLazyLinkTypeControllerGetAllLinksQuery()
  const [getUserInfo] = useLazyUserControllerGetUserDetailsQuery()

  useEffect(() => {
    if (isEmpty(userInfo)) getUserInfo()
    if (isEmpty(tagList.data)) getTagList()
    getSocialLink()
  }, [])

  const mockUpload = ({ file, onSuccess, onError }: any) => {
    console.log('Uploading...', file)

    setTimeout(() => {
      if (Math.random() > 0.2) {
        onSuccess({ url: URL.createObjectURL(file) })
        toast.success('Upload successfully!')
      } else {
        onError(new Error('Upload failed!'))
        toast.error('Upload failed!')
      }
    }, 1500)
  }

  const handleUpload: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      setAvatar(info.file.response.url)
      setValue('featuredImage', info.file.response.url)
    }
  }

  return (
    <div className='pt-8 pb-12 w-[75%] m-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-6'>
          <div className='w-[80px] object-cover'>
            <img src={avatar || 'https://via.placeholder.com/80'} alt='Avatar' className='w-20 h-20 rounded-full' />
          </div>
          <div>
            <MtbTypography variant='h4'>Name</MtbTypography>
            <MtbTypography variant='p'>Headline (Short description)</MtbTypography>
          </div>
        </div>
        <div>
          <Upload onChange={handleUpload} customRequest={mockUpload} showUploadList={false}>
            <Button color='primary' size='large'>
              Change image
            </Button>
          </Upload>
        </div>
      </div>
      <div className='pt-8'>
        <FormProvider {...methods}>
          <AddBotForm></AddBotForm>
        </FormProvider>
      </div>
    </div>
  )
}

export default NewBotPage
