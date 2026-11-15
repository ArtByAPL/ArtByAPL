// Exchange rates from CAD, for showing approximate prices in other currencies.
// Checkout itself is always in CAD. Rates are cached for 12 hours.
const FALLBACK = { CAD: 1, USD: 0.72, EUR: 0.66, GBP: 0.56, AUD: 1.1 };

export async function handleRates(request, env, ctx) {
  const cache = caches.default;
  const key = new Request('https://rates.cache/cad-v1');
  const hit = await cache.match(key);
  if (hit) return hit;
  let rates = FALLBACK, source = 'fallback';
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/CAD', { cf: { cacheTtl: 43200 } });
    const j = await r.json();
    if (j && j.rates && j.rates.USD) {
      rates = { CAD: 1, USD: j.rates.USD, EUR: j.rates.EUR, GBP: j.rates.GBP, AUD: j.rates.AUD };
      source = 'live';
    }
  } catch (_) {}
  const res = new Response(JSON.stringify({ base: 'CAD', rates, source }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=43200' },
  });
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}
