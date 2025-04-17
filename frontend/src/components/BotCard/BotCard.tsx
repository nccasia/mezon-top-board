import { UploadOutlined } from '@ant-design/icons'
import { avatarBotDefault } from '@app/assets'
import { AppStatus } from '@app/enums/AppStatus.enum'
import Button from '@app/mtb-ui/Button'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { IBotCardProps } from '@app/types/Botcard.types'
import { randomColor } from '@app/utils/mezonApp'
import { getUrlImage, uuidToNumber } from '@app/utils/stringHelper'
import { Popover, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import ShareButton from './components/ShareButton'

function BotCard({ readonly = false, data }: IBotCardProps) {
  const navigate = useNavigate()
  const handleInvite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    window.open(data?.installLink, '_blank')
  }
  const handleShare = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  const imgUrl = data?.featuredImage ? getUrlImage(data.featuredImage) : avatarBotDefault
  // Share to social media
  const shareUrl = 'https://www.google.com/'
  const title = data?.name || 'Check out this app!'
  const description = data?.description || 'Discover this amazing application.'

  return (
    <div
      className='shadow-md pb-8 pt-8 px-8 border border-gray-300 relative rounded-xl cursor-pointer'
      onClick={() => navigate(`/${data?.id}`)}
    >
      <div className='flex flex-col md:flex-row items-start gap-6 w-full'>
        <div className='w-24 md:w-36 flex-shrink-0'>
          <img src={imgUrl} alt='Bot' className='w-full h-auto object-cover aspect-square' />
        </div>

        <div className='flex flex-1 flex-col gap-3 overflow-hidden min-w-0'>
            <div className='truncate-title '>
              <style>
                {`
                  .truncate-title .ant-typography {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                  }
                `}
              </style>
              <MtbTypography variant='h4' customClassName='max-w-6/7' >{data?.name}</MtbTypography>
            </div>
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
          <div
            className='text-gray-700 break-words max-w-full'
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3
            }}
          >
            {data?.headline}
          </div>
        </div>
      </div>
      <div className='absolute top-2 right-2 flex gap-3'>
        <Button variant='solid' color='secondary' size='large' onClick={handleInvite}>
          Invite
        </Button>
        <Popover
          content={<ShareButton text={`${title} - ${description}`} url={shareUrl} />}
          trigger='click'
          placement='bottomRight'
          arrow={false}
          overlayInnerStyle={{ marginTop: '8px', minWidth: '200px', maxWidth: '300px' }}
        >
          <Button size='large' color='default' icon={<UploadOutlined />} onClick={handleShare} />
        </Popover>
      </div>
    </div>
  )
}

export default BotCard
