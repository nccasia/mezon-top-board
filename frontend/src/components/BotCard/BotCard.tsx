import { UploadOutlined } from '@ant-design/icons'
import { avatarBotDefault } from '@app/assets'
import { AppStatus } from '@app/enums/AppStatus.enum'
import Button from '@app/mtb-ui/Button'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { IBotCardProps } from '@app/types/Botcard.types'
import { randomColor } from '@app/utils/mezonApp'
import { getUrlImage, uuidToNumber } from '@app/utils/stringHelper'
import { Dropdown, Menu, Tag } from 'antd'
import { title } from 'process'
import { useNavigate } from 'react-router-dom'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  XIcon
} from 'react-share'

function BotCard({ readonly = false, data }: IBotCardProps) {
  const navigate = useNavigate()
  const handleInvite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    window.open(data?.installLink, '_blank')
  }
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  const imgUrl = data?.featuredImage ? getUrlImage(data.featuredImage) : avatarBotDefault
  // Share to social media
  const shareUrl = data?.installLink || window.location.href
  const title = data?.name || 'Check out this app!'
  const description = data?.description || 'Discover this amazing application.'

  // Define the dropdown menu
  const shareMenu = (
    <Menu>
      <Menu.Item key='facebook'>
        <FacebookShareButton url={shareUrl} hashtag={`#MezonApp`}>
          <FacebookIcon size={32} round /> Facebook
        </FacebookShareButton>
      </Menu.Item>
      <Menu.Item key='twitter'>
        <TwitterShareButton url={shareUrl} title={title}>
          <XIcon size={32} round /> X (Twitter)
        </TwitterShareButton>
      </Menu.Item>
      <Menu.Item key='linkedin'>
        <LinkedinShareButton url={shareUrl} title={title} summary={description}>
          <LinkedinIcon size={32} round /> LinkedIn
        </LinkedinShareButton>
      </Menu.Item>
    </Menu>
  )
  return (
    <div
      className='shadow-md pb-8 pt-8 px-8 border border-gray-300 relative rounded-xl cursor-pointer'
      onClick={() => navigate(`/${data?.id}`)}
    >
      <div className='flex flex-col md:flex-row items-start gap-6'>
        <div className='w-32 md:w-48'>
          <img src={imgUrl} alt='Bot' className='w-full h-auto rounded-lg' />
        </div>

        <div className='flex-1'>
          <div className='flex flex-col gap-3'>
            <MtbTypography variant='h4'>{data?.name}</MtbTypography>
            <div className='flex gap-1'>
              {data?.status !== AppStatus.PUBLISHED && <Tag color='red'>UNPUBLISHED</Tag>}
              <MtbRate readonly={readonly} value={data?.rateScore}></MtbRate>
            </div>
            <div className='flex gap-2'>
              {data?.tags?.map((tag) => (
                <Tag key={tag?.id} color={randomColor('normal', uuidToNumber(tag?.id))}>
                  {tag?.name}
                </Tag>
              ))}
            </div>
            <p className='text-gray-700'>{data?.headline}</p>
          </div>
        </div>
      </div>
      <div className='absolute top-2 right-2 flex gap-3'>
        <Button variant='solid' color='secondary' size='large' onClick={handleInvite}>
          Invite
        </Button>
        <Dropdown overlay={shareMenu} trigger={['click']}>
          <Button size='large' color='default' icon={<UploadOutlined />} onClick={handleShare} />
        </Dropdown>
      </div>
    </div>
  )
}

export default BotCard
