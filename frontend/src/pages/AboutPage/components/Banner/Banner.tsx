import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import screenshot from '@app/assets/images/screenshot.png'

function Banner() {
  return (
    <div className={`bg-gray-200 pt-7 pb-7 pl-20 pr-20`}>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1'>
          <MtbTypography variant='h1'>Mezon Top Board</MtbTypography>
          <div className='pt-3'>
            <p className='text-gray-500'>
              Welcome to Mezon Top Board, your go-to platform for discovering the best applications built on the Mezon
              ecosystem. Our mission is to curate and showcase top-tier applications that leverage Mezon's cutting-edge
              technology, helping users and developers explore innovative solutions with ease.
            </p>
          </div>
          <div className='pt-6'>
            <Button color='default' variant='solid' size='large'>
              Get Started
            </Button>
          </div>
        </div>
        <div className='flex-1 object-cover w-full'>
          <img src={screenshot} alt='' width='100%' />
        </div>
      </div>
    </div>
  )
}

export default Banner
