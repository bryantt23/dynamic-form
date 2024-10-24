import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Results from './components/Results.jsx'
import Form from './components/Form.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Form />
  },
  {
    path: '/results',
    element: <Results />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
)
