// Cloudflare Worker entry point.
// Static files in /public are served by Cloudflare. The worker runs first only to
// handle "coming soon" mode and the /api/* routes.
import { handleArtworks } from './stripe.js';
import { handleGlb } from './glb.js';
import { handleRates } from './rates.js';

// "Coming soon" mode: the public addresses show only public/coming-soon.html.
// Preview URLs (preview-artbyapl…workers.dev) still show the full site.
// To launch the real site, set COMING_SOON to false (or delete these lines).
const COMING_SOON = false;
const PUBLIC_HOSTS = ['artbyapl.com', 'www.artbyapl.com', 'artbyapl.artbyapl.workers.dev'];
const SOON_FILES = ['/coming-soon.html', '/logo.png', '/favicon.png', '/apple-touch-icon.png', '/art/coming-soon-bg.jpg'];

async function comingSoon(request, env, url) {
  if (SOON_FILES.includes(url.pathname)) return env.ASSETS.fetch(request);
  const page = await env.ASSETS.fetch(new Request(new URL('/coming-soon', url), request));
  const res = new Response(page.body, page);
  res.headers.set('Cache-Control', 'no-cache');
  res.headers.set('X-Robots-Tag', 'noindex');
  return res;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (COMING_SOON && PUBLIC_HOSTS.includes(url.hostname)) {
      return comingSoon(request, env, url);
    }

    if (url.pathname === '/api/artworks' && request.method === 'GET') {
      return handleArtworks(request, env, ctx);
    }
    if (url.pathname === '/api/rates' && request.method === 'GET') {
      return handleRates(request, env, ctx);
    }
    if (url.pathname.startsWith('/api/glb/') && request.method === 'GET') {
      return handleGlb(request, env);
    }
    if (url.pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
};
