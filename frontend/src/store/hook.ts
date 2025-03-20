import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '.'
import { IAuthStore } from './auth'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAuth = () => {
    return useAppSelector<RootState, IAuthStore>((s) => s.auth)
}
