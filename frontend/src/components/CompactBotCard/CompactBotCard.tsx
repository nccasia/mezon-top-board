import { DeleteOutlined, EditOutlined, RiseOutlined, StarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ICompactBotCardProps } from '@app/types/Botcard.types'
import { getUrlImage } from '@app/utils/stringHelper'
import { avatarBotDefault } from '@app/assets'
import { Dropdown, MenuProps } from 'antd'
import { toast } from 'react-toastify'

function CompactBotCard({ data, isPublic = true }: ICompactBotCardProps) {
  const navigate = useNavigate()
  const handleNavigateDetail = () => {
    if (data?.id) {
      navigate(`/${data?.id}`)
    }
  }
  const imgUrl = data?.featuredImage ? getUrlImage(data.featuredImage) : avatarBotDefault
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation()
  };

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '1',
      icon: <EditOutlined/>,
      onClick: () => {
        navigate(`/new-bot?id=${data?.id}`)
      }
    },
    {
      label: 'Delete',
      key: '2',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        toast.info('Delete bot.');
      }
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className='shadow-sm rounded-2xl p-4 bg-white cursor-pointer' onClick={handleNavigateDetail}>
      <div className='relative'>
        <div className='w-20 m-auto'>
          <img src={imgUrl} alt='' className='rounded-full object-cover w-full' width={'100%'} />
        </div>
        {!isPublic && <Dropdown.Button buttonsRender={([leftBtn, rightBtn]) => [null, <span onClick={(e) => e.stopPropagation()} className='!absolute !top-0 !right-0'>{rightBtn}</span>]} trigger={["click"]} menu={menuProps}>
        </Dropdown.Button>}
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
