import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import RootLayout from './layouts/RootLayout/RootLayout'
import HomePage from './pages/HomePage/HomePage'
import { Suspense } from 'react'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])
