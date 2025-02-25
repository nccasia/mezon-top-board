import { UploadOutlined } from '@ant-design/icons'
import Button from '@app/mtb-ui/Button'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { IBotCardProps } from '@app/types/Botcard.types'
import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

function BotCard({ readonly = false, data }: IBotCardProps) {
  const navigate = useNavigate()
  return (
    <div
      className='shadow-md pb-8 pt-8 px-8 border border-gray-300 relative rounded-xl cursor-pointer'
      onClick={() => navigate(`/${data?.id}`)}
    >
      <div className='flex flex-col md:flex-row items-start gap-4'>
        <div className='w-32 md:w-48'>
          <img
            src={data?.featuredImage || 'https://placehold.co/200x200'}
            alt='Bot'
            className='w-full h-auto rounded-lg'
          />
        </div>

        <div className='flex-1'>
          <div className='flex flex-col gap-3'>
            <MtbTypography variant='h4'>{data?.name}</MtbTypography>
            <div className='flex gap-1'>
              <MtbRate readonly={readonly} value={data?.rateScore}></MtbRate>
            </div>
            <div className='flex gap-2'>
              {data?.tags?.map((tag) => <Tag className='!text-gray-500' key={tag?.id}>{tag?.name}</Tag>)}
            </div>
            <p className='text-gray-700'>
              {data?.headline ||
                `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad voluptate enim delectus ipsam aperiam
              repudiandae dolores quod. Architecto earum, aliquam possimus, dolores eos alias molestiae reiciendis
              minima placeat, iusto exercitationem!`}
            </p>
          </div>
        </div>
      </div>
      <div className='absolute top-2 right-2 flex gap-3'>
        <Button variant='solid' color='secondary' size='large'>
          Invite
        </Button>
        <Button size='large' color='default' icon={<UploadOutlined />} />
      </div>
    </div>
  )
}

export default BotCard
