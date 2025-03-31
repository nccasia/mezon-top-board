import {
  CreditCardOutlined,
  EditOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  SettingOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import avatar from '@app/assets/images/default-user.webp'
import { TypographyStyle } from '@app/enums/typography.enum'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { useMediaControllerCreateMediaMutation } from '@app/services/api/media/media'
import { useUserControllerSelfUpdateUserMutation } from '@app/services/api/user/user'
import { getUrlImage } from '@app/utils/stringHelper'
import { Spin, Upload } from 'antd'
import { toast } from 'react-toastify'
import { CardInfoProps } from './CardInfo.types'
import { useRenderAvatar } from '@app/hook/useRenderAvatar'

function CardInfo({ isPublic, userInfo }: CardInfoProps) {
  const imgUrl = userInfo?.profileImage ? getUrlImage(userInfo.profileImage) : avatar
  const [selfUpdate] = useUserControllerSelfUpdateUserMutation()
  const [uploadImage] = useMediaControllerCreateMediaMutation()
  const { renderedAvatar, setIsUpdating } = useRenderAvatar(imgUrl, !isPublic)

  const cardInfoLink = [
    {
      icon: <InfoCircleOutlined />,
      name: 'Overview',
      path: isPublic ? `/profile/${userInfo?.id}` : `/profile`,
      isPublic: true,
    },
    {
      icon: <UserAddOutlined />,
      name: 'Invitations',
      path: '/profile',
      isPublic: false,
    },
    {
      icon: <CreditCardOutlined />,
      name: 'Subscriptions',
      path: '/profile',
      isPublic: false,
    },
    {
      icon: <SettingOutlined />,
      name: 'Settings',
      path: '/profile/setting',
      isPublic: false,
    }
  ]

  const handleUpload = async (options: any) => {
    if (isPublic)
      return;

    const { file, onSuccess, onError } = options

    try {
      const formData = new FormData()
      formData.append('file', file)
      setIsUpdating(true)
      const response = await uploadImage(formData).unwrap()

      if (response?.statusCode === 200) {
        await selfUpdate({ selfUpdateUserRequest: { profileImage: response?.data?.filePath } }).unwrap()
        setIsUpdating(false)
      }

      onSuccess(response, file)
      toast.success('Upload Success')
    } catch (error) {
      toast.error('Upload failed!')
      onError(error)
    }
  }

  return (
    <div className='flex flex-col gap-7 p-4 shadow-sm rounded-2xl'>
      <div className='flex items-center gap-4 max-lg:flex-col max-2xl:flex-col'>
        <Upload disabled={isPublic} listType='picture-circle' customRequest={handleUpload} showUploadList={false}>
          {renderedAvatar}
        </Upload>
        <div className='text-lg font-semibold'>{userInfo?.name}</div>
      </div >
      <div>
        <MtbTypography variant='p' customClassName='!pl-0' weight='bold' textStyle={[TypographyStyle.UPPERCASE]}>
          Generals
        </MtbTypography>
        <MtbTypography variant='p' customClassName='!pl-0 !text-gray-500' size={14}>
          {userInfo?.bio}
        </MtbTypography>
        <p className='font-'></p>
        <ul className='pt-2'>
          {cardInfoLink
            .filter(item => item.isPublic || !isPublic)
            .map(
              (item, index) => (
                <li
                  key={index}
                  className='p-2 cursor-pointer align-middle hover:bg-red-400 transition-all'
                >
                  <a href={item.path} className='w-full inline-block'>
                    <span className='mr-4'>{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              )
            )
          }
        </ul>
      </div>
    </div >
  )
}

export default CardInfo
