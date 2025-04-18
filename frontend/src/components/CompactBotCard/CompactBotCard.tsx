import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, RiseOutlined, StarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ICompactBotCardProps } from '@app/types/Botcard.types'
import { getUrlImage } from '@app/utils/stringHelper'
import { avatarBotDefault } from '@app/assets'
import { Dropdown, MenuProps, Modal } from 'antd'
import { toast } from 'react-toastify'
import { useMezonAppControllerDeleteMezonAppMutation } from '@app/services/api/mezonApp/mezonApp'

function CompactBotCard({ data, isPublic = true }: ICompactBotCardProps) {
  const navigate = useNavigate()
  const handleNavigateDetail = () => {
    if (data?.id) {
      navigate(`/bot/${data?.id}`)
    }
  }
  const imgUrl = data?.featuredImage ? getUrlImage(data.featuredImage) : avatarBotDefault

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation()
  };
  const [deleteBot] = useMezonAppControllerDeleteMezonAppMutation()
  const { confirm } = Modal;


  const handleDeleteBot = (botId: string) => {
    confirm({
      title: "Are you sure you want to delete this bot?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteBot({ requestWithId: { id: botId } }).unwrap();
          toast.success("Bot deleted successfully.");
        } catch (error) {
          toast.error("Failed to delete bot.");
        }
      },
    });
  };
  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '1',
      icon: <EditOutlined />,
      onClick: () => {
        navigate(`/new-bot/${data?.id}`)
      }
    },
    {
      label: 'Delete',
      key: '2',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => {
        if (!data?.id) {
          toast.error("Invalid bot ID.");
          return
        }
        handleDeleteBot(data?.id);
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
          <img src={imgUrl} alt='' className='aspect-square rounded-full object-cover w-full' width={'100%'} />
        </div>
        {!isPublic && <Dropdown.Button buttonsRender={([leftBtn, rightBtn]) => [null, <span onClick={(e) => e.stopPropagation()} className='!absolute !top-0 !right-0'>{rightBtn}</span>]} trigger={["click"]} menu={menuProps}>
        </Dropdown.Button>}
      </div>
      <div className='pt-3 pb-3 font-black truncate'>{data?.name || 'Name'}</div>
      <div className='flex justify-between items-center'>
        <p>
          <StarOutlined /> {data?.rateScore || 0}
        </p>
        <p>
          <RiseOutlined /> 841,999
        </p>
      </div>
    </div>
  )
}

export default CompactBotCard
