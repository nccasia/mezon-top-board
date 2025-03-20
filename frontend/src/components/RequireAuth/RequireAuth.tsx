import { useAuth } from '@app/store/hook'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () => {
  const { isLogin } = useAuth()
  const location = useLocation()

  return isLogin ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />
}

export default RequireAuth
