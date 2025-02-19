import { UploadOutlined } from '@ant-design/icons'
import Button from '@app/mtb-ui/Button'
import MtbRate from '@app/mtb-ui/Rate/Rate'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import { IBotCardProps } from '@app/types/Botcard.types'
import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

function BotCard({ readonly = false }: IBotCardProps) {
  const navigate = useNavigate()
  return (
    <div
      className='shadow-md pb-8 pt-8 px-8 border border-gray-300 relative rounded-xl cursor-pointer'
      onClick={() => navigate('/detail')}
    >
      <div className='flex flex-col md:flex-row items-start gap-4'>
        <div className='w-32 md:w-48'>
          <img src='https://placehold.co/200x200' alt='Bot' className='w-full h-auto rounded-lg' />
        </div>

        <div className='flex-1'>
          <div className='flex flex-col gap-3'>
            <MtbTypography variant='h4'>Mezon Bot 1</MtbTypography>
            <div className='flex gap-1'>
              <MtbRate readonly={readonly} value={4.5}></MtbRate>
            </div>
            <div className='flex gap-2'>
              <Tag color='#22c55e'>Enhance</Tag>
              <Tag color='#ef4444'>Tool</Tag>
            </div>
            <p className='text-gray-700'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad voluptate enim delectus ipsam aperiam
              repudiandae dolores quod. Architecto earum, aliquam possimus, dolores eos alias molestiae reiciendis
              minima placeat, iusto exercitationem!
            </p>
          </div>
        </div>
      </div>
      <div className='absolute top-2 right-2 flex gap-3'>
        <Button variant="solid" color="secondary" size='large'>Invite</Button>
        <Button size='large' color='default' icon={<UploadOutlined />} />
      </div>
    </div>
  )
}

export default BotCard
