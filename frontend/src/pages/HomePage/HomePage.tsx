import { useLazyUserControllerGetUserDetailsQuery } from '@app/services/api/user/user'
import Banner from './components/Banner/Banner'
import Main from './components/Main/Main'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@app/store'
import { IAuthStore } from '@app/store/auth'
function HomePage() {
  const [getUserInfo] = useLazyUserControllerGetUserDetailsQuery()
  const { isLogin } = useSelector<RootState, IAuthStore>((s) => s.auth)
  useEffect(() => {
    if (isLogin) {
      getUserInfo()
    }
  }, [isLogin])
  return (
    <div>
      <Banner></Banner>
      <Main></Main>
    </div>
  )
}

export default HomePage
