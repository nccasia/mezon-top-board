import Button from '@app/mtb-ui/Button'
import MtbTypography from '@app/mtb-ui/Typography/Typography'

function Banner() {
  return (
    <div className={`bg-gray-200 pt-7 pb-7 pl-20 pr-20`}>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1'>
          <MtbTypography variant='h1'>Mezon Top Board</MtbTypography>
          <MtbTypography variant='h1'>#1 Bot Listing for Mezon</MtbTypography>
          <div className='pt-3'>
            <p className='text-gray-500'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eum quasi ipsam in voluptas laboriosam
              perferendis. Quibusdam
            </p>
          </div>
          <div className='pt-6'>
            <Button color='default' variant='solid' size='large'>
              Get Started
            </Button>
          </div>
        </div>
        <div className='flex-1 object-cover w-full'>
          <img src='https://placehold.co/350x200' alt='' width='100%' />
        </div>
      </div>
    </div>
  )
}

export default Banner
