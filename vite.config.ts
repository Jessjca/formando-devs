import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
export default defineConfig({
	plugins: [sveltekit()]
});
