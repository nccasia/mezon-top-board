import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { Spin, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AddBotForm from './components/AddBotForm/AddBotForm'
import { useLazyTagControllerGetTagsQuery } from '@app/services/api/tag/tag'
import { FormProvider, useForm } from 'react-hook-form'
import { CreateMezonAppRequest, useLazyMezonAppControllerGetMezonAppDetailQuery } from '@app/services/api/mezonApp/mezonApp'
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
import MTBAvatar from '@app/mtb-ui/Avatar/MTBAvatar'
import useQueryParam from '@app/hook/useQueryParam'
import { IMezonAppStore } from '@app/store/mezonApp'
import { useParams } from 'react-router-dom'
function NewBotPage() {
  const { mezonAppDetail } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  const { tagList } = useSelector<RootState, ITagStore>((s) => s.tag)
  const { botId } = useParams()
  const imgUrl = botId && mezonAppDetail.featuredImage ? getUrlImage(mezonAppDetail.featuredImage) : avatarBotDefault
  const [avatar, setAvatar] = useState<string>(imgUrl)
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
  
  const { setValue, reset } = methods
  const nameValue = methods.watch("name");
  const headlineValue = methods.watch("headline");

  const [getTagList] = useLazyTagControllerGetTagsQuery()
  const [getSocialLink] = useLazyLinkTypeControllerGetAllLinksQuery()
  const [uploadImage, { isLoading: isUpdatingAvatar }] = useMediaControllerCreateMediaMutation()
  const [getMezonAppDetails] = useLazyMezonAppControllerGetMezonAppDetailQuery()

  useEffect(() => {
    if (isEmpty(tagList.data)) getTagList()
    getSocialLink()
  }, [])

  useEffect(() => {
    if (!botId) {
      reset()
      return
    }
    getMezonAppDetails({ id: botId })
  }, [botId])

  useEffect(() => {
    const { owner, tags, rateScore, featuredImage, ...rest } = mezonAppDetail
    if (mezonAppDetail && botId) reset({ ...rest, tagIds: tags?.map(tag => tag.id) })
    setAvatar(imgUrl)
  }, [mezonAppDetail])

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
            <Upload customRequest={handleUpload} showUploadList={false}>
              <MTBAvatar imgUrl={avatar} isAllowUpdate={true} isUpdatingAvatar={isUpdatingAvatar} />
            </Upload>
          </div>
          <div>
            <MtbTypography variant='h4'>{nameValue || "Name"}</MtbTypography>
            <MtbTypography variant='p'>{headlineValue || 'Headline (Short description)'}</MtbTypography>
          </div>
        </div>
      </div>
      <div className='pt-8'>
        <FormProvider {...methods}>
          <AddBotForm onResetAvatar={resetAvatar} isEdit={Boolean(botId)}></AddBotForm>
        </FormProvider>
      </div>
    </div>
  )
}

export default NewBotPage
