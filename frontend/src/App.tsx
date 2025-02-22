import { Bounce, ToastContainer } from 'react-toastify'
import { renderRoutes } from './navigation/router'
import { Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>{renderRoutes()}</Routes>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  )
}

export default App
