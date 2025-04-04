import { routePaths } from '@app/navigation/routePaths'
import { RootState } from '@app/store'
import { useAppSelector } from '@app/store/hook'
import { IMezonAppStore } from '@app/store/mezonApp'
import { IUserStore } from '@app/store/user'
import { fillHbsFormat } from '@app/utils/stringHelper'
import { getRouteMatchPath } from '@app/utils/uri'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const useWebTitle = () => {
  const location = useLocation()
  const { publicProfile } = useAppSelector<RootState, IUserStore>((s) => s.user)
  const { mezonAppDetail } = useSelector<RootState, IMezonAppStore>((s) => s.mezonApp)
  
  const routePath = getRouteMatchPath(routePaths.map((e) => ({ path: e.path })) || [], location.pathname)
  const route = routePaths.find((route) => route.path === routePath);
  
  const path = location.pathname.split('/').filter((i) => i)
  let pageName = route?.strLabel || path[path.length - 1] || 'Home'

  const updateTitle = useCallback(() => {
    pageName = fillHbsFormat(pageName, {
      userName: publicProfile?.name || 'User',
      botName: mezonAppDetail?.name || 'Bot',
    })
    document.title = `${pageName} - Mezon Top Board`
  }, [location.pathname, publicProfile?.name, mezonAppDetail?.name])

  useEffect(() => {
    updateTitle()
  }, [location.pathname, publicProfile?.name, mezonAppDetail?.name])
}

export default useWebTitle
