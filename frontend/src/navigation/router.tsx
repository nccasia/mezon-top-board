import AdminLayout from '@app/components/layouts/AdminLayout'
import RootLayout from '@app/components/layouts/RootLayout'
import { RootState } from '@app/store'
import { IAuthStore } from '@app/store/auth'
import { RoutePath } from '@app/types/RoutePath.types'
import { useSelector } from 'react-redux'
import { Route, useLocation } from 'react-router'
import { adminRoutePaths } from './adminRoutePaths'
import { routePaths } from './routePaths'

export const renderRoutes = () => {
  const getRouteCompact = (route: RoutePath) => {
    const getRouteSingular = (route: RoutePath, key?: string) => <Route key={key || route.path} path={route.path} element={route.element} index={route.index} />

    if (!route.children || route.children.length === 0) {
      return getRouteSingular(route)
    }

    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children.map((childRoute, idx) => getRouteSingular(childRoute, `${route.path}-${idx}`))}
      </Route>
    )
  }

  return (
    <>
      <Route path='/' element={<RootLayout />}>
        {routePaths.map((route) => getRouteCompact(route))}
      </Route>

      {/* ROUTE FOR ADMIN */}
      <Route path='/manage' element={<AdminLayout />}>
        {adminRoutePaths.map((route) => getRouteCompact(route))}
      </Route>
    </>
  )
}

export const renderMenu = (isHasActive: boolean) => {
  const location = useLocation()
  const { isLogin } = useSelector<RootState, IAuthStore>((s) => s.auth)

  return routePaths
    .filter((route) => route.isShowMenu && (isLogin || !route.requireAuth))
    .map((route, index) => {
      const isActive = location.pathname === route.path && isHasActive

      return (
        <li key={`${route.path}-${index}`}>
          <a
            href={route.path}
            className={`!text-black pb-2 transition-all duration-300 border-b-3 max-lg:block max-2xl:block ${isActive ? 'border-b-primary-hover' : 'border-b-transparent hover:border-b-primary-hover'}`}
          >
            {route.label || route.strLabel}
          </a>
        </li>
      )
    })
}
