import { Divider, Input, Tag } from 'antd'
import { renderMenu } from '@app/navigation/router'
import Button from '@app/mtb-ui/Button'
import MtbTypography from '../Typography/Typography'
import { FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons'
const footerLink = [
  {
    icon: <FacebookFilled />,
    link: 'https://www.facebook.com/'
  },
  {
    icon: <TwitterOutlined />,
    link: 'https://x.com/'
  },
  {
    icon: <InstagramOutlined />,
    link: 'https://www.instagram.com/'
  },
  {
    icon: <YoutubeFilled />,
    link: 'https://www.youtube.com/'
  }
]
function Footer() {
  return (
    <div className='pt-10 pb-5 bg-gray-100'>
      <div className={`flex justify-around items-center pb-8`}>
        <div className='flex gap-4 items-center'>
          <MtbTypography variant='h5' customClassName='!mb-0 !text-gray-600'>Follow us</MtbTypography>
          {footerLink.map((item, index) => (
            <Tag key={index} className='!rounded-full !p-2 !bg-gray-300 !text-lg cursor-pointer hover:!bg-gray-100' onClick={() => window.open(item.link, '_blank')}>
              {item.icon}
            </Tag>
          ))}
        </div>
        <div className='flex gap-4 items-center'>
          <MtbTypography variant='h5' customClassName='!mb-0 !text-gray-600'>Get Newsletter</MtbTypography>
          <div className='flex'>
            <Input type='text' placeholder='Your email address' style={{ borderRadius: 0 }}></Input>
            <Button
              color='default'
              variant='solid'
              customClassName='!bg-black !text-white !border-black !rounded-none opacity-100 hover:opacity-75 !py-5'
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <Divider className='bg-gray-400' />
      <ul className='flex justify-center pt-10 gap-6'>{renderMenu(false)}</ul>
      <div className='flex flex-col items-center pt-8 gap-2'>
        <MtbTypography variant='p' customClassName='!mb-0 !text-gray-600' weight='normal'>Address: 2nd Floor, CT3 The Pride, To Huu st, Ha Dong District, Ha Noi City, Viet Nam</MtbTypography>
        <MtbTypography variant='p' customClassName='!mb-0 !text-gray-600' weight='normal'>(+84) 2466874606</MtbTypography>
      </div>
    </div>
  )
}

export default Footer
