// src/routes/adminRoutePaths.ts

import Dashboard from "@app/pages/AdminPage/Dashboard";
import { RoutePath } from "@app/types/RoutePath.types";


export const adminRoutePaths: RoutePath[] = [
  {
    path: "",
    element: <Dashboard />, // Default page when accessing /admin
    label: "Dashboard",
  },
  {
    path: "users",
    element: <h1>Users</h1>,
    label: "Users",
  },
  {
    path: "orders",
    element: <h1>Orders</h1>,
    label: "Orders",
  },
  {
    path: "products",
    element: <h1>Products</h1>,
    label: "Products",
  },
  {
    path: "settings",
    element: <h1>Settings</h1>,
    label: "Settings",
  },
];
