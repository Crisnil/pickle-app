import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import AppLayout from './layouts/AppLayout'
import FindGamePage from './pages/FindGamePage'
import HealthCheckPage from './pages/HealthCheckPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<FindGamePage />} />
          <Route path="dev/health" element={<HealthCheckPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
