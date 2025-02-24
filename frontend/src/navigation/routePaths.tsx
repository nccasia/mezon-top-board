import BotDetailPage from '@app/pages/BotDetailPage/BotDetailPage'
import HomePage from '@app/pages/HomePage/HomePage'
import LoginPage from '@app/pages/LoginPage/LoginPage'
import NewBotPage from '@app/pages/NewBotPage/NewBotPage'
import NotFoundPage from '@app/pages/NotFoundPage/NotFoundPage'
import ProfilePage from '@app/pages/ProfilePage/ProfilePage'
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
    path: '/detail',
    element: <BotDetailPage />,
    label: '',
    isShowMenu: false
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
    path: '/my-profile',
    element: <ProfilePage></ProfilePage>,
    label: '',
    isShowMenu: false
  },
  {
    path: 'new-bot',
    element: <NewBotPage></NewBotPage>,
    label: '',
    isShowMenu: false
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
