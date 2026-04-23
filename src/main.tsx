import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import './index.css'
import App from './App.tsx'
import Quiz from './Pages/Quiz.tsx'
import End from './Pages/End.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz-ended" element={<End />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
