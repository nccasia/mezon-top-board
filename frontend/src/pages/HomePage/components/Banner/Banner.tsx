import { Button } from "antd"
import styles from './Banner.module.scss'

function Banner() {
  return (
    <div className={`flex justify-between items-center bg-gray-200 ${styles.banner}`}>
      <div className='flex flex-col justify-center'>
        <p className='text-5xl font-bold pb-1'>Mezon Top Board</p>
        <p className='text-5xl font-bold'>#1 Bot Listing for Mezon</p>
        <div className='pt-6'>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur</p>
          <p className='text-gray-500'>adipisicing elit. Accusamus eum quasi ipsam </p>
          <p className='text-gray-500'>in voluptas laboriosam perferendis. Quibusdam </p>
        </div>
        <div className='pt-6'>
          <Button color='default' variant='solid' size='large'>
            Get Started
          </Button>
        </div>
      </div>
      <div>
        <img src='https://placehold.co/600x400' alt='' width='100%' />
      </div>
    </div>
  )
}

export default Banner
