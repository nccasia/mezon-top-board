// src/routes/adminRoutePaths.ts

import { AppstoreAddOutlined, HistoryOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import MezonAppsContainer from '@app/pages/AdminPage/AdminMezonApp/MezonAppsContainer'
import ReviewHistoryPage from '@app/pages/AdminPage/ReviewHistoryPage/ReviewHistoryPage'
import UsersList from "@app/pages/AdminPage/AdminManageUsers/UsersList";
import { RoutePath } from '@app/types/RoutePath.types'

export const adminRoutePaths: RoutePath[] = [
  {
    index: true,
    path: '/manage/apps',
    element: <MezonAppsContainer />, // Default page when accessing /admin
    strLabel: 'Apps',
    icon: <AppstoreAddOutlined />,
    isShowMenu: true
  },
  {
    path: '/manage/review-history',
    element: <ReviewHistoryPage />,
    strLabel: 'Review History',
    icon: <HistoryOutlined />,
    isShowMenu: true
  },
  {
    path: "/manage/users",
    element: <UsersList/>,
    strLabel: "Users",
    icon: <UserOutlined/>,
    isShowMenu: true
  },
  {
    path: '/manage/settings',
    element: <h1>Settings</h1>,
    strLabel: 'Settings',
    icon: <SettingOutlined />,
    isShowMenu: true
  }
]
