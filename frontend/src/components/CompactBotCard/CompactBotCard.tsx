import { RiseOutlined, StarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ICompactBotCardProps } from '@app/types/Botcard.types'
import { getUrlImage } from '@app/utils/stringHelper'
import { avatarBotDefault } from '@app/assets'

function CompactBotCard({ data }: ICompactBotCardProps) {
  const navigate = useNavigate()
  const handleNavigateDetail = () => {
    if (data?.id) {
      navigate(`/${data?.id}`)
    }
  }
  const imgUrl = data?.featuredImage ? getUrlImage(data.featuredImage) : avatarBotDefault
  return (
    <div className='shadow-sm rounded-2xl p-4 bg-white cursor-pointer' onClick={handleNavigateDetail}>
      <div className='pl-10 pr-10 rounded-2xl'>
        <div className='w-20 m-auto'>
          <img src={imgUrl} alt='' className='aspect-square rounded-full object-cover w-full' width={'100%'} />
        </div>
      </div>
      <p className='pt-3 pb-3 font-black'>{data?.name || 'Name'}</p>
      <div className='flex justify-between items-center'>
        <p>
          <StarOutlined /> {data?.rateScore || 0}
        </p>
        <p>
          <RiseOutlined /> 841,600
        </p>
      </div>
    </div>
  )
}

export default CompactBotCard
