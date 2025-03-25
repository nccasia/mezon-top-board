import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"

const useAuthRedirect = () => {
  const navigate = useNavigate()
  const { isLogin } = useAuth()

  useEffect(() => {
    if (!isLogin) {
      navigate("/")
      return
    }
  }, [isLogin, navigate])
}

export default useAuthRedirect
