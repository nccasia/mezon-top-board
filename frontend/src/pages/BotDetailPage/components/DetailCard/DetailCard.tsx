import {
  DiscordOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  RiseOutlined,
  TagOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Tag } from 'antd'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import avatar from '@app/assets/images/0e54d87446f106d1fd58385295ae9deb.png'

function DetailCard() {
  return (
    <div className='shadow-sm rounded-2xl bg-white p-4'>
      <div className='pb-4'>
        <MtbTypography label={<InfoCircleOutlined />} variant='h5'>
          Details
        </MtbTypography>
        <div className='pt-2'>
          <MtbTypography label={<DollarOutlined />} position='right' variant='h5' weight='normal'>
            Prefix
          </MtbTypography>
          <MtbTypography variant='h5' weight='normal'>
            Shards 1792
          </MtbTypography>
          <MtbTypography variant='h5' weight='normal'>
            Server Count 3371839
          </MtbTypography>
        </div>
      </div>
      <div className='pb-4'>
        <MtbTypography variant='h5' label={<RiseOutlined />}>
          Socials
        </MtbTypography>
        <div>
          <MtbTypography variant='h5' weight='normal' label={<LinkOutlined />}>
            www.patreon.com
          </MtbTypography>
          <MtbTypography variant='h5' weight='normal' label={<DiscordOutlined />}>
            Discord Support Server
          </MtbTypography>
        </div>
      </div>
      <div className='pb-5'>
        <MtbTypography variant='h5' label={<TagOutlined />}>
          Categories
        </MtbTypography>
        <div className='pt-1'>
          {Array.from({ length: 3 }, (_, index) => (
            <Tag key={index}>Tag</Tag>
          ))}
        </div>
      </div>
      <div className='pb-4'>
        <MtbTypography variant='h5' label={<UserOutlined />}>
          Creators
        </MtbTypography>
        <div className={`pt-2`}>
          <Tag className='!rounded-[50px] !px-6 !py-3'>
            <div className='flex gap-4'>
              <div className='w-[50px]'>
                <img src={avatar} alt='' className='rounded-full' />
              </div>
              <MtbTypography variant='p'>Username</MtbTypography>
            </div>
          </Tag>
        </div>
      </div>
    </div>
  )
}

export default DetailCard
