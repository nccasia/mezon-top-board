import { Button, Flex } from 'antd'
import logo from '@app/assets/images/topLogo.png'
import styles from './Header.module.scss'
import { renderMenu } from '@app/navigation/router'

function Header() {
  return(
    <Flex className={styles.header} align='center' justify='space-between'>
      <Flex gap={12} align='center'>
        <div className='w-10'>
          <img src={logo} alt=''  width={'100%'}/>
        </div>
        <p>Mezon Top Board</p>
      </Flex>
      <Flex gap={50} align='center' justify='space-between'>
        <ul className='flex gap-10'>{renderMenu()}</ul>
        <Flex gap={10}>
          <Button color='default' variant='solid' size='large'>
            Sign Up
          </Button>
          <Button color='default' variant='outlined' size='large'>
            Log in
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
