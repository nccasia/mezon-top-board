import HomePage from '@app/pages/HomePage/HomePage'
import LoginPage from '@app/pages/LoginPage/LoginPage'
import NotFoundPage from '@app/pages/NotFoundPage/NotFoundPage'
import { RoutePath } from '@app/types/RoutePath.types'

export const routePaths: RoutePath[] = [
  {
    index: true,
    path: '/',
    element: <HomePage />,
    label: 'Home',
    isShowMenu: true
  },
  {
    path: '/about',
    element: <></>,
    label: 'About',
    isShowMenu: true
  },
  {
    path: '/your-bots',
    element: <></>,
    label: 'Your Bots',
    isShowMenu: true
  },
  {
    path: '/terms',
    element: <></>,
    label: 'Terms',
    isShowMenu: true
  },
  {
    path: '/help',
    element: <></>,
    label: 'Help',
    isShowMenu: true
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]
