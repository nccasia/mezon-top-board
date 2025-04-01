import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Upload } from 'antd'
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
import { isEmpty } from 'lodash'
import { ITagStore } from '@app/store/tag'
import { useLazyLinkTypeControllerGetAllLinksQuery } from '@app/services/api/linkType/linkType'
import { useMediaControllerCreateMediaMutation } from '@app/services/api/media/media'
import { getUrlImage } from '@app/utils/stringHelper'
import { avatarBotDefault } from '@app/assets'
function NewBotPage() {
  const [avatar, setAvatar] = useState<string>(avatarBotDefault)
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const methods = useForm<CreateMezonAppRequest>({
    defaultValues: {
      name: '',
      headline: '',
      description: '',
      installLink: '',
      prefix: '',
      tagIds: [],
      supportUrl: '',
      remark: '',
      isAutoPublished: false,
      socialLinks: []
    },
    resolver: yupResolver(ADD_BOT_SCHEMA)
  })

  const { setValue } = methods
  const nameValue = methods.watch("name");
  const headlineValue = methods.watch("headline");

  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const [getSocialLink] = useLazyLinkTypeControllerGetAllLinksQuery()
  const [uploadImage] = useMediaControllerCreateMediaMutation()

  useEffect(() => {
    if (isEmpty(tagList.data)) getTagList()
    getSocialLink()
  }, [])

  const resetAvatar = () => {
    setAvatar(avatarBotDefault)
  }

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await uploadImage(formData).unwrap()

      if (response?.statusCode === 200) {
        setAvatar(getUrlImage(response?.data?.filePath))
        setValue('featuredImage', response?.data?.filePath)
      }

      onSuccess(response, file)
      toast.success('Upload Success')
    } catch (error) {
      toast.error('Upload failed!')
      onError(error)
    }
  }

  return (
    <div className='pt-8 pb-12 w-[75%] m-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-6'>
          <div className='w-[80px] object-cover'>
            <img src={avatar} alt='Avatar' className='w-20 h-20 rounded-full' />
          </div>
          <div>
            <MtbTypography variant='h4'>{nameValue || "Name"}</MtbTypography>
            <MtbTypography variant='p'>{headlineValue ||'Headline (Short description)'}</MtbTypography>
          </div>
        </div>
        <div>
          <Upload customRequest={handleUpload} showUploadList={false}>
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
