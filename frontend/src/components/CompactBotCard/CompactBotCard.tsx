import { RiseOutlined, StarOutlined } from '@ant-design/icons'
import avatar from '../../assets/images/0e54d87446f106d1fd58385295ae9deb.png'
function CompactBotCard() {
  return (
    <div>
      <div className='pl-10 pr-10 bg-zinc-300 rounded-2xl'>
        <div className='w-20'>
          <img src={avatar} alt='' className='rounded-full' width={'100%'} />
        </div>
      </div>
      <p className='pt-3 pb-3'>Name</p>
      <div className='flex justify-between items-center'>
        <p><StarOutlined /> 4,1</p>
        <p><RiseOutlined /> 841,600</p>
      </div>
    </div>
  )
}

export default CompactBotCard
