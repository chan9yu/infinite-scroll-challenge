import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element with id "root" not found');
}

// 디버그 모드 설정
localStorage.setItem('debug', '*');

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
