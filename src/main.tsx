import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Codex } from './codex/Codex'
import { UpdatePrompt } from './UpdatePrompt'
import './styles/fonts.css'
import './styles/global.css'
import './styles/pseudo.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Codex />
    <UpdatePrompt />
  </StrictMode>,
)
