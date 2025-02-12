import RootLayout from "@app/components/layouts/RootLayout";
import HomePage from "@app/pages/HomePage/HomePage";
import LoginPage from "@app/pages/LoginPage/LoginPage";
import NotFoundPage from "@app/pages/NotFoundPage/NotFoundPage";
import { Suspense } from "react";
import { Route } from "react-router";

export const ROUTES = [
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        path: '/',
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        )
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
  }
]

export const renderRoutes = () => {
  return ROUTES.map((route, index: number) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && route.children.map((childRoute, idx) => (
        <Route key={`${index}-${idx}`} path={childRoute.path} element={childRoute.element} />
      ))}
    </Route>
  ));
};
