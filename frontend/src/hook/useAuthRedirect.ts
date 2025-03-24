import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = (isLogin: boolean) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate('/')
      return
    }
  }, [isLogin, navigate])
}

export default useAuthRedirect
