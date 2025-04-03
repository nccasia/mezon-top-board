import { DollarOutlined, InfoCircleOutlined, RiseOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import MtbTypography from '@app/mtb-ui/Typography/Typography'
import avatar from '@app/assets/images/default-user.webp'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IMezonAppStore } from '@app/store/mezonApp'
import { IUserStore } from '@app/store/user'
import { getUrlImage } from '@app/utils/stringHelper'
import { useEffect, useState } from 'react'
import { GetPublicProfileResponse, useLazyUserControllerGetPublicProfileQuery } from '@app/services/api/user/user'

function DetailCard() {
  const { mezonAppDetail } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  const { userInfo } = useSelector<RootState, IUserStore>((s) => s.user)
  const [creatorInfo, setCreatorInfo] = useState<GetPublicProfileResponse>()
  const [queryGetPublicProfile, { data: publicUserInfo }] = useLazyUserControllerGetPublicProfileQuery()

  const initRequests = async () => {
    if (mezonAppDetail?.owner?.id) {
      queryGetPublicProfile({ userId: mezonAppDetail?.owner?.id }).unwrap();
    }
  }
  useEffect(() => {
    initRequests()
  }, [mezonAppDetail?.owner?.id])

  useEffect(() => {
    if (publicUserInfo?.data) {
      setCreatorInfo(publicUserInfo?.data)
    }
  }, [publicUserInfo]);

  return (
    <div className='shadow-sm rounded-2xl bg-white p-4'>
      <div className='pb-4'>
        <MtbTypography label={<InfoCircleOutlined className='text-xl !text-pink-500' />} variant='h3'>
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
        <MtbTypography variant='h3' label={<RiseOutlined className='text-xl !text-pink-500' />}>
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
        <MtbTypography variant='h3' label={<TagOutlined className='text-xl !text-pink-500' />}>
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
        <MtbTypography variant='h3' label={<UserOutlined className='text-xl !text-pink-500' />}>
          Creators
        </MtbTypography>
        <div className={`pt-2`}>
          <a href={`/profile/${userInfo.id === mezonAppDetail?.owner?.id ? "" : mezonAppDetail?.owner?.id}`}>
            <Tag className='!rounded-lg !pr-6 !py-3 !shadow-md !bg-white flex items-center'>
              <div className='flex gap-4 items-center'>
                <div className='w-[40px] h-[40px] overflow-hidden rounded-xl'>
                  <img src={creatorInfo?.profileImage ? getUrlImage(creatorInfo?.profileImage) : avatar} alt='' className='w-full h-full object-cover' />
                </div>
                <MtbTypography variant='p' customClassName='!text-dark'>
                  {mezonAppDetail?.owner?.name}
                </MtbTypography>
              </div>
            </Tag>
          </a>
        </div>
      </div>
    </div>
  )
}

export default DetailCard
