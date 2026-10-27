// Cloudflare Worker entry point.
// Static files in /public are served directly by Cloudflare (free, never reach this code).
// Only /api/* requests run here.
import { handleArtworks } from './stripe.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/artworks' && request.method === 'GET') {
      return handleArtworks(request, env, ctx);
    }
    if (url.pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
};
