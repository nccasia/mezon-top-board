import RootLayout from '@app/components/layouts/RootLayout'
import { Route, useLocation } from 'react-router'
import { routePaths } from './routePaths'
import { adminRoutePaths } from './adminRoutePaths'
import AdminLayout from '@app/components/layouts/AdminLayout'
import { RoutePath } from '@app/types/RoutePath.types'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IAuthStore } from '@app/store/auth'
import RequireAuth from '@app/components/RequireAuth/RequireAuth'

export const renderRoutes = () => {
  const renderRouteChild = (route: RoutePath) => {
    if (route.requireAuth) {
      return (
        <Route element={<RequireAuth />}>
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((childRoute, idx) => (
                <Route key={`${route.path}-${idx}`} path={childRoute.path} element={childRoute.element} />
              ))}
          </Route>
        </Route>
      )
    }
    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children &&
          route.children.map((childRoute, idx) => (
            <Route key={`${route.path}-${idx}`} path={childRoute.path} element={childRoute.element} />
          ))}
      </Route>
    )
  }

  return (
    <>
      <Route path='/' element={<RootLayout />}>
        {routePaths.map((route) => renderRouteChild(route))}
      </Route>

      {/* ROUTE FOR ADMIN */}
      <Route element={<RequireAuth />}>
        <Route path='/manage' element={<AdminLayout />}>
          {adminRoutePaths.map((route) => renderRouteChild(route))}
        </Route>
      </Route>
    </>
  )
}

export const renderMenu = (isHasActive: boolean) => {
  const location = useLocation()
  const { isLogin } = useSelector<RootState, IAuthStore>((s) => s.auth)

  return routePaths
    .filter((route) => isLogin || route.path !== '/your-bots')
    .map((route, index) => {
      if (route.isShowMenu) {
        const isActive = location.pathname === route.path && isHasActive

        return (
          <li key={`${route.path}-${index}`}>
            <a
              href={route.path}
              className={`!text-black pb-2 transition-all duration-300 border-b-3 max-lg:block max-2xl:block ${isActive ? 'border-b-primary-hover' : 'border-b-transparent hover:border-b-primary-hover'}`}
            >
              {route.label}
            </a>
          </li>
        )
      }
      return null
    })
}
