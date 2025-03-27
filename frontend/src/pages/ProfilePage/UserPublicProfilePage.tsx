import { useMezonAppSearch } from "@app/hook/useSearch"
import SearchBar from "@app/mtb-ui/SearchBar/SearchBar"
import MtbTypography from "@app/mtb-ui/Typography/Typography"
import { useLazyUserControllerGetUserDetailsQuery, useLazyUserControllerGetUserPublicInfoQuery } from "@app/services/api/user/user"
import { RootState } from "@app/store"
import { useAppSelector } from "@app/store/hook"
import { IUserStore } from "@app/store/user"
import { Divider } from "antd"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import UserPublicInfoCard from "./components/UserPublicInfoCard"

function UserPublicProfilePage() {
    const navigate = useNavigate()
    const { handleSearch } = useMezonAppSearch(1, 5)
    const { userId } = useParams()
    const { userInfo: currentUser } = useAppSelector<RootState, IUserStore>((s) => s.user)
    const [getUserInfo] = useLazyUserControllerGetUserDetailsQuery()
    const [queryGetUserPublicInfo, { data: queryResponse }] = useLazyUserControllerGetUserPublicInfoQuery()
    const userPublicInfo = queryResponse?.data
    const getUserPublicInfo = async () => {
        try {
            if (!userId) throw new Error("userId is invalid")
            queryGetUserPublicInfo({ userId }).unwrap()
        } catch (error) {
            toast.error("Error")
        }
    }

    if (Object.keys(currentUser).length > 0 && userPublicInfo && Object.keys(userPublicInfo).length > 0 && currentUser.id === userPublicInfo?.id) navigate('/profile')

    useEffect(() => {
        getUserInfo()
        getUserPublicInfo()
    }, [userId, getUserInfo])

    return (
        <div className='pt-8 pb-12 w-[75%] m-auto'>
            <MtbTypography variant='h1'>Explore millions of Mezon Bots</MtbTypography>
            <div className='pt-3'>
                <SearchBar onSearch={(val, tagIds) => handleSearch(val ?? '', tagIds)} isResultPage={false}></SearchBar>
            </div>
            <Divider className='bg-gray-100'></Divider>
            <div className='flex justify-between gap-15 max-lg:flex-col max-2xl:flex-col'>
                <div className='flex-1'>
                    <UserPublicInfoCard userPublicInfo={userPublicInfo}></UserPublicInfoCard>
                </div>
                <div className='flex-2'>
                    <div className='flex justify-between items-center pb-10'>
                        <MtbTypography variant='h2'>Welcome to {userPublicInfo?.name}'s profile</MtbTypography>
                    </div>
                    <div className='grid grid-cols-1 gap-8 min-lg:grid-cols-2 min-xl:grid-cols-3 max-w-full'>
                        LIST OF THIS USER'S BOTS
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserPublicProfilePage