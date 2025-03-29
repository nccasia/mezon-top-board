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

function CardInfo({ isPublic, userInfo }: CardInfoProps) {
  const imgUrl = userInfo?.profileImage ? getUrlImage(userInfo.profileImage) : avatar
  const [selfUpdate, { isLoading: isUpdating }] = useUserControllerSelfUpdateUserMutation()
  const [uploadImage] = useMediaControllerCreateMediaMutation()

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
      const response = await uploadImage(formData).unwrap()

      if (response?.statusCode === 200) {
        await selfUpdate({ selfUpdateUserRequest: { profileImage: response?.data?.filePath } }).unwrap()
      }

      onSuccess(response, file)
      toast.success('Upload Success')
    } catch (error) {
      toast.error('Upload failed!')
      onError(error)
    }
  }

  const renderAvatar = (imgUrl: string, isAllowUpdate = false) => {
    const renderOverlay = () => {
      if (!isAllowUpdate) return null;

      return isUpdating ? (
        <div className='absolute inset-0 flex items-center justify-center bg-opacity-40 rounded-full'>
          <Spin indicator={<LoadingOutlined className='text-white text-2xl' />} />
        </div>
      ) : (
        <div className='absolute inset-0 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <EditOutlined className='text-white text-lg' />
        </div>
      );
    };

    return (
      <div className={`relative w-full group ${isAllowUpdate ? 'cursor-pointer' : 'cursor-default'}`}>
        <img
          src={imgUrl}
          alt='avatar'
          className={`rounded-full w- full aspect-square object-cover ${isUpdating ? 'opacity-50' : ''}`}
        />
        {renderOverlay()}
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-7 p-4 shadow-sm rounded-2xl'>
      <div className='flex items-center gap-4 max-lg:flex-col max-2xl:flex-col'>
        <Upload disabled={isPublic} listType='picture-circle' customRequest={handleUpload} showUploadList={false}>
          {renderAvatar(imgUrl, !isPublic)}
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
