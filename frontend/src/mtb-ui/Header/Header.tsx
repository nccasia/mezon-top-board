import { MenuOutlined } from '@ant-design/icons'
import logo from '@app/assets/images/topLogo.png'
import Button from '@app/mtb-ui/Button'
import { renderMenu } from '@app/navigation/router'
import { redirectToOAuth } from '@app/utils/auth'
import { Drawer } from 'antd'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MtbTypography from '../Typography/Typography'
import styles from './Header.module.scss'

function Header() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  // const { theme, setTheme } = useTheme()

  const handleLogin = useCallback(() => redirectToOAuth(), [])

  return (
    <div
      className={`flex bg-white z-9999 items-center justify-between py-5 px-20 border-t-1 border-b-1 border-gray-200 cursor-pointer sticky top-0`}
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
        <div className='flex gap-2.5'>
          <Button color='primary' variant='solid' size='large'>
            Sign Up
          </Button>
          <Button color='default' variant='outlined' size='large' onClick={handleLogin}>
            Log in
          </Button>
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
