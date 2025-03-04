import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import logo from '@app/assets/images/topLogo.png'
import Button from '@app/mtb-ui/Button'
import { renderMenu } from '@app/navigation/router'
import { redirectToOAuth } from '@app/utils/auth'
import { Drawer, Dropdown, MenuProps, Space } from 'antd'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MtbTypography from '../Typography/Typography'
import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IUserStore } from '@app/store/user'
import { removeAccessTokens } from '@app/utils/storage'
import { IAuthStore, setLogIn } from '@app/store/auth'

function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  // const { theme, setTheme } = useTheme()
  const { userInfo } = useSelector<RootState, IUserStore>((s) => s.user)
  const { isLogin } = useSelector<RootState, IAuthStore>((s) => s.auth)
  const dispatch = useDispatch()

  const handleLogin = useCallback(() => redirectToOAuth(), [])
  const handleLogout = () => {
    removeAccessTokens()
    dispatch(setLogIn(false))
  }

  const itemsDropdown: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
      onClick: handleLogout
    }
  ]

  return (
    <div
      className={`flex bg-white z-1 items-center justify-between py-5 px-20 border-t-1 border-b-1 border-gray-200 cursor-pointer sticky top-0`}
    >
      <div className='flex items-center gap-3' onClick={() => navigate('/')}>
        <div className='w-10'>
          <img src={logo} alt='' width={'100%'} />
        </div>
        <div>
          <MtbTypography variant='h5' weight='normal' style={{ marginBottom: 0 }}>
            Mezon Top Board
          </MtbTypography>
        </div>
      </div>
      <div className='flex items-center justify-between gap-12.5 max-lg:hidden max-2xl:hidden'>
        {/* <div className={`flex items-center ${styles['custom-switch']}`}>
          <Switch
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            className='!align-middle'
          />
        </div> */}
        <ul className='flex gap-10'>{renderMenu(true)}</ul>
        <div>
          {isLogin ? (
            <Dropdown menu={{ items: itemsDropdown }} className='z-2'>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Welcome, {userInfo?.name}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Button color='primary' size='large' onClick={handleLogin}>
              Log in
            </Button>
          )}
        </div>
      </div>
      <div className='2xl:hidden'>
        <MenuOutlined className='text-xl cursor-pointer' onClick={() => setOpen(true)} />
      </div>
      <Drawer
        className={styles['custom-drawer']}
        zIndex={9999}
        title={
          <MtbTypography variant='h4' customClassName='!mb-0'>
            Menu
          </MtbTypography>
        }
        placement='right'
        onClose={() => setOpen(false)}
        open={open}
        width={400}
      >
        <ul className='flex flex-col gap-5 text-sm'>{renderMenu(true)}</ul>
        <div className='flex flex-col gap-3 mt-5'>
          <Button color='primary' variant='solid' size='large' block>
            Sign Up
          </Button>
          <Button color='default' variant='outlined' size='large' block onClick={handleLogin}>
            Log in
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

export default Header
