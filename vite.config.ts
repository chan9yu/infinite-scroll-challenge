import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/infinite-scroll-challenge/',
	plugins: [react()],
	server: {
		open: true,
		port: 3035
	}
});
