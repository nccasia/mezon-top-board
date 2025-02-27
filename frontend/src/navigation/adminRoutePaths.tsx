// src/routes/adminRoutePaths.ts

import { AppstoreAddOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import MezonApps from "@app/pages/AdminPage/MezonApps";
import { RoutePath } from "@app/types/RoutePath.types";


export const adminRoutePaths: RoutePath[] = [
  {
    path: "apps",
    element: <MezonApps />, // Default page when accessing /admin
    label: "Apps",
    icon: <AppstoreAddOutlined/>
  },
  {
    path: "users",
    element: <h1>Users</h1>,
    label: "Users",
    icon: <UserOutlined/>
  },
  {
    path: "settings",
    element: <h1>Settings</h1>,
    label: "Settings",
    icon: <SettingOutlined/>
  },
];
