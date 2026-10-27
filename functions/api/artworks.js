// GET /api/artworks
// Reads the artworks straight from Stripe: every Payment Link = one artwork.
//  - Product name / description / photo  -> title / description / image
//  - Product metadata (optional): medium, dimensions, year
//  - Link deactivated, or its one-payment limit reached -> shown as "Sold"
//  - Product archived in Stripe -> hidden from the site
// Needs one secret in Cloudflare: STRIPE_SECRET_KEY (a restricted, read-only key).

const STRIPE = 'https://api.stripe.com/v1';
const CACHE_SECONDS = 60;

export async function onRequestGet(context) {
  const { env, request } = context;

  if (!env.STRIPE_SECRET_KEY) {
    return json({ artworks: [], demo: true }, 0);
  }

  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/artworks', request.url).toString());
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const artworks = await loadArtworks(env.STRIPE_SECRET_KEY);
    const res = json({ artworks }, CACHE_SECONDS);
    context.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  } catch (err) {
    console.error(err);
    return json({ error: 'unavailable' }, 0, 502);
  }
}

export async function loadArtworks(key, fetchImpl = fetch) {
  const stripe = async (path) => {
    const r = await fetchImpl(STRIPE + path, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!r.ok) throw new Error(`Stripe ${r.status} on ${path}`);
    return r.json();
  };

  // 1. All payment links (paginated)
  const links = [];
  let after = '';
  for (let page = 0; page < 5; page++) {
    const res = await stripe(
      `/payment_links?limit=100${after ? `&starting_after=${after}` : ''}`
    );
    links.push(...res.data);
    if (!res.has_more || res.data.length === 0) break;
    after = res.data[res.data.length - 1].id;
  }

  // 2. The product behind each link
  const items = await Promise.all(
    links.map(async (link) => {
      const li = await stripe(
        `/payment_links/${link.id}/line_items?limit=1&expand%5B%5D=data.price.product`
      );
      const line = li.data && li.data[0];
      const price = line && line.price;
      const product = price && price.product;
      if (!product || typeof product !== 'object') return null;
      if (product.deleted || product.active === false) return null; // archived = hidden

      const limit = link.restrictions && link.restrictions.completed_sessions;
      const limitReached = limit ? limit.count >= limit.limit : false;
      const sold = !link.active || limitReached;
      const meta = product.metadata || {};

      return {
        id: link.id,
        title: product.name,
        description: product.description || '',
        image: (product.images || [])[0] || null,
        price: price.unit_amount,
        currency: price.currency,
        url: sold ? null : link.url,
        sold,
        medium: meta.medium || meta.technique || '',
        dimensions: meta.dimensions || meta.format || '',
        year: meta.year || meta.annee || '',
        created: product.created || 0,
      };
    })
  );

  // Available first, then newest first
  return items
    .filter(Boolean)
    .sort((a, b) => Number(a.sold) - Number(b.sold) || b.created - a.created);
}

function json(body, maxAge, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': maxAge ? `public, max-age=${maxAge}` : 'no-store',
    },
  });
}
