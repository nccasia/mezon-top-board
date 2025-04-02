import { routePaths } from '@app/navigation/routePaths'
import { useLazyMezonAppControllerGetMezonAppDetailQuery, useLazyMezonAppControllerGetRelatedMezonAppQuery } from '@app/services/api/mezonApp/mezonApp'
import { GetPublicProfileResponse, useLazyUserControllerGetPublicProfileQuery } from '@app/services/api/user/user'
import { RootState } from '@app/store'
import { useAppSelector } from '@app/store/hook'
import { IMezonAppStore } from '@app/store/mezonApp'
import { IUserStore } from '@app/store/user'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const TitleConstants: React.FC = () => {
  const location = useLocation()
  const { userInfo: myInfo } = useAppSelector<RootState, IUserStore>((s) => s.user)
  const [userInfo, setUserInfo] = useState<GetPublicProfileResponse>()
  const [queryGetPublicProfile, { data: publicUserInfo }] = useLazyUserControllerGetPublicProfileQuery()
  const { mezonAppDetail } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)

  const [getMezonAppDetail] = useLazyMezonAppControllerGetMezonAppDetailQuery()


  // Extract userId or botId from the URL path
  const extractUserId = (path: string): string | null => {
    const profileRegex = /\/profile\/([^/]+)/
    const match = path.match(profileRegex)
    return match ? match[1] : null
  }
  let userId = null;
  let botId = null;

  (location.pathname.includes('/profile/')) ? userId = extractUserId(location.pathname) : botId = location.pathname.slice(1)

  const initRequests = async () => {
    if (userId) {
      queryGetPublicProfile({ userId }).unwrap()
    } else if (botId) {
      getMezonAppDetail({ id: botId })
    }
  }

  useEffect(() => {
    initRequests()
  }, [userId, botId])

  useEffect(() => {
    if (!userId) {
      setUserInfo(myInfo)
      return
    }

    if (publicUserInfo?.data) {
      setUserInfo(publicUserInfo?.data)
    }
  }, [myInfo, publicUserInfo, userId])

  useEffect(() => {
    let pageName = ''
    if (location.pathname.includes('/profile/') && userId && userId !== 'setting') {
      if (userInfo?.name) {
        pageName = userInfo.name
      } else {
        pageName = 'Profile'
      }
    } else if (botId === mezonAppDetail.id) {
      pageName = mezonAppDetail.name;
    } else {
      const matchedRoute = routePaths.find(
        (route) => route.path === location.pathname || route.path === location.pathname.slice(1)
      )
      const label = matchedRoute?.label
      pageName = getPageNameFromPath(typeof label === 'string' ? label : '')
    }

    document.title = `${pageName} - Mezon Top Board`
  }, [location, userInfo, mezonAppDetail])

  const getPageNameFromPath = (path: string): string => {
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return null
}

export default TitleConstants
