import { UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Rate, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

interface IBotCardProps {
  readonly?: boolean,
}
function BotCard({ readonly = false }: IBotCardProps) {
  const navigate = useNavigate()
  return (
    <div
      className='shadow-md pb-8 pt-8 pl-8 border-1 border-gray-300 relative rounded-xl cursor-pointer'
      onClick={() => navigate('/detail')}
    >
      <Flex gap={20}>
        <div>
          <img src='https://placehold.co/200x218' alt='' />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-xl font-bold'>Mezon Bot 1</p>
          <div className='flex gap-1'>
            <Rate defaultValue={readonly ? 4.5 : undefined} allowHalf disabled={readonly} />
          </div>
          <Flex>
            <Tag color='#22c55e'>Enhance</Tag>
            <Tag color='#ef4444'>Tool</Tag>
          </Flex>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad voluptate enim delectus ipsam aperiam
            repudiandae dolores quod. Architecto earum, aliquam possimus, dolores eos alias molestiae reiciendis minima
            placeat, iusto exercitationem!
          </p>
        </div>
      </Flex>
      <div className='absolute top-0 right-0 pt-2 pr-2 flex gap-3'>
        <Button>Invite</Button>
        <UploadOutlined />
      </div>
    </div>
  )
}

export default BotCard
