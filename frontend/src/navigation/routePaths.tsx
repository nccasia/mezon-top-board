import HomePage from "@app/pages/HomePage/HomePage";
import LoginPage from "@app/pages/LoginPage/LoginPage";
import NotFoundPage from "@app/pages/NotFoundPage/NotFoundPage";
import { RoutePath } from "@app/types/RoutePath.types";

export const routePaths: RoutePath[] = [
    {
        index: true,
        path: '/',
        element: <HomePage />
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