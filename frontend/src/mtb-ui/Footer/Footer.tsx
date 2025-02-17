import { Divider, Input } from 'antd'
import styles from './Footer.module.scss'
import { renderMenu } from '@app/navigation/router'
import Button from '@app/components/common/Button'
function Footer() {
  return (
    <div className='pt-10 pb-20 bg-gray-300'>
      <div className={`flex justify-around items-center pb-8`}>
        <div className='flex gap-3'>
          <p>Follow us</p>
          <p>Icon 1</p>
          <p>Icon 2</p>
          <p>Icon 3</p>
          <p>Icon 4</p>
        </div>
        <div className='flex gap-4 items-center'>
          <p>Get Newsletter</p>
          <div className='flex'>
            <Input type='text' placeholder='Your email address' style={{ borderRadius: 0 }}></Input>
            <Button color='default' variant='solid' style={{ borderRadius: 0 }}>
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <Divider style={{ borderColor: 'gray' }} />
      <ul className={`flex justify-center pt-10 ${styles['footer-bottom']}`}>
        {renderMenu()}
      </ul>
      <div className='flex flex-col items-center pt-8'>
        <p>Address</p>
        <p>License</p>
      </div>
    </div>
  )
}

export default Footer
