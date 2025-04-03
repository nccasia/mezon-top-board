import AboutPage from '@app/pages/AboutPage/AboutPage'
import BotDetailPage from '@app/pages/BotDetailPage/BotDetailPage'
import HelpPage from '@app/pages/HelpPage/HelpPage'
import HomePage from '@app/pages/HomePage/HomePage'
import LoginPage from '@app/pages/LoginPage/LoginPage'
import { LoginRedirectPage } from '@app/pages/LoginRedirectPage'
import NewBotPage from '@app/pages/NewBotPage/NewBotPage'
import NotFoundPage from '@app/pages/NotFoundPage/NotFoundPage'
import ProfilePage from '@app/pages/ProfilePage/ProfilePage'
import SettingPage from '@app/pages/ProfilePage/SettingPage'
import SearchPage from '@app/pages/SearchPage/SearchPage'
import TermsPage from '@app/pages/TermsPage/TermsPage'
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
    path: 'callbacks',
    element: <LoginRedirectPage />,
    isShowMenu: false
  },
  {
    path: '/:botId',
    element: <BotDetailPage />,
    label: '',
    isShowMenu: false
  },
  {
    path: '/about',
    element: <AboutPage></AboutPage>,
    label: 'About',
    isShowMenu: true
  },
  {
    path: '/profile',
    element: <ProfilePage></ProfilePage>,
    label: 'My Profile',
    isShowMenu: true,
    requireAuth: true
  },
  {
    path: '/profile/setting',
    element: <SettingPage></SettingPage>,
    label: 'Setting page',
    isShowMenu: false
  },
  {
    path: '/profile/:userId',
    element: <ProfilePage></ProfilePage>,
    label: '',
    isShowMenu: false
  },
  {
    path: '/search',
    element: <SearchPage></SearchPage>,
    label: '',
    isShowMenu: false
  },
  {
    path: '/terms',
    element: <TermsPage></TermsPage>,
    label: 'Terms',
    isShowMenu: true
  },
  {
    path: '/help',
    element: <HelpPage></HelpPage>,
    label: 'Help',
    isShowMenu: true
  },
  {
    path: 'new-bot',
    element: <NewBotPage></NewBotPage>,
    label: '',
    isShowMenu: false
  },
  {
    path: '/new-bot/:botId',
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
