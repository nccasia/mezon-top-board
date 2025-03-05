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
    name: 'Overview'
  },
  {
    icon: <UserAddOutlined />,
    name: 'Invitations'
  },
  {
    icon: <CreditCardOutlined />,
    name: 'Subscriptions'
  },
  {
    icon: <SettingOutlined />,
    name: 'Settings'
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
        <ul className='pt-2'>
          {cardInfoLink.map((item, index) => (
            <li key={index} className='p-2 cursor-pointer align-middle hover:bg-red-400 transition-all'>
              <span className='mr-4'>{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CardInfo
