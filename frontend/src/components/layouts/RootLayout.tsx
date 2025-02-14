import Footer from '@app/mtb-ui/Footer/Footer'
import Header from '@app/mtb-ui/Header/Header'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default RootLayout
