import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Results from './components/Results.jsx'
import Form from './components/Form.jsx'

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
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
