import { RootState } from '@app/store'
import { IAuthStore, setLogIn } from '@app/store/auth'
import { useAppSelector } from '@app/store/hook'
import { useDispatch } from 'react-redux'

export const useAuth = () => {
  const auth = useAppSelector<RootState, IAuthStore>((s) => s.auth)
  const dispatch = useDispatch()

  const login = () => dispatch(setLogIn(true))
  const logout = () => dispatch(setLogIn(false))

  return { ...auth, login, logout }
}
