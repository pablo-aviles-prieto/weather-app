import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import './styles/index.css';
import './i18n';

// biome-ignore lint/style/noNonNullAssertion: <implemented by vite>
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
