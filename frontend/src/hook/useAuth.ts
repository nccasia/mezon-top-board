import { RootState } from '@app/store'
import { IAuthStore, setLogIn } from '@app/store/auth'
import { useAppSelector } from '@app/store/hook'
import { clearUserInfo } from '@app/store/user'
import { useDispatch } from 'react-redux'

export const useAuth = () => {
  const auth = useAppSelector<RootState, IAuthStore>((s) => s.auth)
  const dispatch = useDispatch()

  const postLogin = () => dispatch(setLogIn(true))
  const postLogout = () => {
    dispatch(setLogIn(false))
    dispatch(clearUserInfo())
  }

  return { ...auth, postLogin, postLogout }
}
