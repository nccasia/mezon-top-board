import { CreditCardOutlined, InfoCircleOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons'
import { TypographyStyle } from '@app/enums/typography.enum'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import avatar from '@app/assets/images/default-user.webp'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IUserStore } from '@app/store/user'

const cardInfoLink = [
  {
    icon: <InfoCircleOutlined />,
    name: 'Overview',
    path: '/your-bots'
  },
  {
    icon: <UserAddOutlined />,
    name: 'Invitations',
    path: '/your-bots'
  },
  {
    icon: <CreditCardOutlined />,
    name: 'Subscriptions',
    path: '/your-bots'
  },
  {
    icon: <SettingOutlined />,
    name: 'Settings',
    path: '/your-bots/setting'
  }
]

function CardInfo() {
  const { userInfo } = useSelector<RootState, IUserStore>((s) => s.user)
  return (
    <div className='flex flex-col gap-7 p-4 shadow-sm rounded-2xl'>
      <div className='flex items-center gap-4 max-lg:flex-col max-2xl:flex-col'>
        <div className='w-[70px] max-lg:w-[100px] max-2xl:w-[100px]'>
          <img src={avatar} alt='avatar' className='rounded-full w-full object-cover' />
        </div>
        <div className='text-lg font-semibold'>{userInfo.name}</div>
      </div>
      <div>
        <MtbTypography variant='p' customClassName='!pl-0' weight='bold' textStyle={[TypographyStyle.UPPERCASE]}>
          Generals
        </MtbTypography>
        <MtbTypography variant='p' customClassName='!pl-0 !text-gray-500' size={14}>
          {userInfo.bio}
        </MtbTypography>
        <p className='font-'></p>
        <ul className='pt-2'>
          {cardInfoLink.map((item, index) => (
            <li key={index} className='p-2 cursor-pointer align-middle hover:bg-red-400 transition-all'>
              <a href={item.path} className='w-full inline-block'>
                <span className='mr-4'>{item.icon}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CardInfo
