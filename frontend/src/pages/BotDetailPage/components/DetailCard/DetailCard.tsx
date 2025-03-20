import { DollarOutlined, InfoCircleOutlined, RiseOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import avatar from '@app/assets/images/default-user.webp'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IMezonAppStore } from '@app/store/mezonApp'

function DetailCard() {
  const { mezonAppDetail } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  console.log('mezonAppDetail', mezonAppDetail)
  return (
    <div className='shadow-sm rounded-2xl bg-white p-4'>
      <div className='pb-4'>
        <MtbTypography label={<InfoCircleOutlined className='text-2xl !text-pink-500' />} variant='h5'>
          Details
        </MtbTypography>
        {mezonAppDetail.prefix && (
          <div className='pt-2'>
            <MtbTypography variant='h5' weight='normal'>
              Prefix: {mezonAppDetail.prefix}
            </MtbTypography>
          </div>
        )}
      </div>
      <div className='pb-4'>
        <MtbTypography variant='h5' label={<RiseOutlined />}>
          Socials
        </MtbTypography>
        <div>
          {mezonAppDetail?.socialLinks?.map((link) => (
            <MtbTypography key={link.id} variant='h5' weight='normal' label={link.icon}>
              <a href={link.url} target='_blank' rel='noopener noreferrer' className='!text-black'>
                {link.url}
              </a>
            </MtbTypography>
          ))}
        </div>
      </div>
      <div className='pb-5'>
        <MtbTypography variant='h5' label={<TagOutlined />}>
          Categories
        </MtbTypography>
        <div className='pt-1'>
          {mezonAppDetail?.tags?.map((tag) => (
            <Tag key={tag.id} className='!cursor-pointer'>
              {tag?.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className='pb-4'>
        <MtbTypography variant='h5' label={<UserOutlined />}>
          Creators
        </MtbTypography>
        <div className={`pt-2`}>
          <Tag className='!rounded-lg !pr-6 !py-3 !shadow-md !bg-gray-800 flex items-center '>
            <div className='flex gap-4 items-center'>
              <div className='w-[40px] h-[40px] overflow-hidden rounded-xl bg-gray-700'>
                <img src={avatar} alt='' className='w-full h-full object-cover' />
              </div>
              <MtbTypography variant='p' customClassName='!text-white'>
                {mezonAppDetail?.owner?.name}
              </MtbTypography>
            </div>
          </Tag>
        </div>
      </div>
    </div>
  )
}

export default DetailCard
