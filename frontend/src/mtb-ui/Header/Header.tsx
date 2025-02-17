import { Button } from 'antd'
import logo from '@app/assets/images/topLogo.png'
import { renderMenu } from '@app/navigation/router'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  return (
    <div className={`flex items-center justify-between pt-5 pb-5 pl-20 pr-20 border-t-1 border-b-1 border-gray-200 cursor-pointer`}>
      <div className='flex items-center gap-3'>
        <div className='w-10' onClick={() => navigate('/')}>
          <img src={logo} alt='' width={'100%'} />
        </div>
        <p>Mezon Top Board</p>
      </div>
      <div className='flex items-center justify-between gap-12.5'>
        <ul className='flex gap-10'>{renderMenu()}</ul>
        <div className='flex gap-2.5'>
          <Button color='default' variant='solid' size='large'>
            Sign Up
          </Button>
          <Button color='default' variant='outlined' size='large'>
            Log in
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header
