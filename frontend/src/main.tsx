import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '@app/store/index.ts'
import { BrowserRouter } from 'react-router-dom'
import TitleConstants from './constants/title.constant.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TitleConstants/>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
