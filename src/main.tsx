import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RouteProvider from './routes/index.tsx';
import './utils/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouteProvider />
  </StrictMode>,
);
