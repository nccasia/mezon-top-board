import { useMezonAppSearch } from "@app/hook/useSearch"
import SearchBar from "@app/mtb-ui/SearchBar/SearchBar"
import MtbTypography from "@app/mtb-ui/Typography/Typography"
import { useLazyUserControllerGetUserPublicInfoQuery } from "@app/services/api/user/user"
import { Divider } from "antd"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import UserPublicInfoCard from "./components/UserPublicInfoCard"
import { useLazyMezonAppControllerGetUserPublicAppQuery } from "@app/services/api/mezonApp/mezonApp"
import CompactBotCard from "@app/components/CompactBotCard/CompactBotCard"

function UserPublicProfilePage() {
    const { handleSearch } = useMezonAppSearch(1, 5)
    const { userId } = useParams()
    const [queryGetUserPublicInfo, { data: queryUserResponse }] = useLazyUserControllerGetUserPublicInfoQuery()
    const [queryGetUserPublicApp, {data: queryAppsResponse}] = useLazyMezonAppControllerGetUserPublicAppQuery()
    const userPublicInfo = queryUserResponse?.data
    const userPublicApp = queryAppsResponse?.data
    const getUserPublicInfo = async () => {
        try {
            if (!userId) throw new Error("userId is invalid")
            queryGetUserPublicInfo({ userId }).unwrap()
        } catch (error) {
            toast.error("Error")
        }
    }
    
    const getUserPublicApp = async () => {
        try {
            if (!userId) throw new Error("userId is invalid")
            queryGetUserPublicApp({ userId }).unwrap()
        } catch (error) {
            toast.error("Error")
        }
    }

    useEffect(() => {
        getUserPublicInfo()
        getUserPublicApp()
    }, [userId])

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
                        {userPublicApp?.map((item) => <CompactBotCard key={item.id} data={item}></CompactBotCard>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserPublicProfilePage