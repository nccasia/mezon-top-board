import RootLayout from "@app/components/layouts/RootLayout";
import { Route } from "react-router";
import { routePaths } from "./routePaths";

export const renderRoutes = () => {
  return (
    <>
      <Route path="/" element={<RootLayout />}>
        {
          routePaths.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            >
              {
                route.children && route.children.map((childRoute, idx) => (
                  <Route
                    key={`${route.path}-${idx}`}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))
              }
            </Route>
          ))
        }
      </Route>
    </>
  )
};
