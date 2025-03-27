import { InfoCircleOutlined } from "@ant-design/icons"
import { GetUserPublicInfoResponse } from "@app/services/api/user/user"
import { getUrlImage } from "@app/utils/stringHelper"
import avatar from '@app/assets/images/default-user.webp'
import MtbTypography from "@app/mtb-ui/Typography/Typography"
import { TypographyStyle } from "@app/enums/typography.enum"

const cardInfoLink = [
    {
        icon: <InfoCircleOutlined />,
        name: 'Overview',
        path: '/profile'
    }
]

function UserPublicInfoCard({ userPublicInfo }: { userPublicInfo: GetUserPublicInfoResponse | undefined }) {
    const imgUrl = userPublicInfo?.profileImage ? getUrlImage(userPublicInfo.profileImage) : avatar

    return (
        <div className='flex flex-col gap-7 p-4 shadow-sm rounded-2xl'>
            <div className='flex items-center gap-4 max-lg:flex-col max-2xl:flex-col'>
                {/* <Upload listType='picture-circle' showUploadList={false}> */}
                <div className="w-[100.4px]">
                    <div className='relative w-full cursor-pointer group'>
                        <img src={imgUrl} alt="avatar" className="rounded-full w-full aspect-square object-cover" />
                    </div>
                </div>
                {/* </Upload> */}
                <div className='text-lg font-semibold'>{userPublicInfo?.name}</div>
            </div>
            <div>
                <MtbTypography variant='p' customClassName='!pl-0' weight='bold' textStyle={[TypographyStyle.UPPERCASE]}>
                    Generals
                </MtbTypography>
                <MtbTypography variant='p' customClassName='!pl-0 !text-gray-500' size={14}>
                    {userPublicInfo?.bio}
                </MtbTypography>
                <p className='font-'></p>
                <ul className='pt-2'>
                    {cardInfoLink.map((item, index) => (
                        <li key={index} className='p-2 cursor-pointer align-middle hover:bg-red-400 transition-all'>
                            <a href={item.path} className='w-full inline-block'>
                                <span className='mr-4'>{item.icon}</span>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default UserPublicInfoCard