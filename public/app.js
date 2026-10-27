// ────────────────────────────────────────────────────────────
// Site settings — the easy things to change live here.
// ────────────────────────────────────────────────────────────
const CONFIG = {
  email: 'bonjour@artbyapl.com',
  instagram: 'https://www.instagram.com/artby_apl/',
  about: {
    fr: "Allie Paige est une artiste en aquarelle abstraite. [À compléter : sa démarche, ses matériaux, d’où elle peint.]",
    en: "Allie Paige is an abstract watercolour artist. [To fill in: her approach, her materials, where she paints.]",
  },
  shipping: {
    fr: "[À compléter : livraison au Canada, ramassage à Montréal, délais, emballage…]",
    en: "[To fill in: shipping within Canada, local pickup in Montréal, timelines, packaging…]",
  },
};

const TEXT = {
  fr: {
    navWorks: 'Œuvres', navAbout: 'À propos', navContact: 'Contact',
    heroTitle: 'Aquarelles abstraites.<br><em>Une seule de chaque.</em>',
    heroSub: 'Des œuvres originales signées Allie Paige. Chaque pièce est unique : quand elle trouve sa maison, elle ne revient pas.',
    filterAvailable: 'Disponibles', filterAll: 'Toutes',
    demo: 'Aperçu — œuvres d’exemple',
    empty: 'Aucune œuvre disponible pour le moment. Revenez bientôt!',
    buy: 'Acheter cette œuvre', sold: 'Vendue',
    soldNote: 'Cette œuvre a trouvé sa maison. Écrivez-moi si ce style vous plaît.',
    shippingTitle: 'Livraison',
    contactText: 'Une question sur une œuvre ou envie d’une commande personnalisée?',
    secure: 'Paiement sécurisé par Stripe',
    seeWorks: 'Voir les œuvres', close: 'Fermer', lang: 'EN',
  },
  en: {
    navWorks: 'Works', navAbout: 'About', navContact: 'Contact',
    heroTitle: 'Abstract watercolours.<br><em>One of each.</em>',
    heroSub: 'Original paintings by Allie Paige. Every piece is one of a kind: once it finds its home, it’s gone.',
    filterAvailable: 'Available', filterAll: 'All',
    demo: 'Preview — sample artworks',
    empty: 'No pieces available right now. Check back soon!',
    buy: 'Buy this piece', sold: 'Sold',
    soldNote: 'This piece has found its home. Write to me if you like this style.',
    shippingTitle: 'Shipping',
    contactText: 'A question about a piece, or interested in a commission?',
    secure: 'Secure payment by Stripe',
    seeWorks: 'See the work', close: 'Close', lang: 'FR',
  },
};

// ────────────────────────────────────────────────────────────
const $ = (s, el = document) => el.querySelector(s);
const state = { lang: initialLang(), filter: 'available', artworks: [], demo: false };

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch (_) {}
  return (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
}

function t(key) { return TEXT[state.lang][key]; }

function money(cents, currency) {
  return new Intl.NumberFormat(state.lang === 'fr' ? 'fr-CA' : 'en-CA', {
    style: 'currency', currency: (currency || 'cad').toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ── Static text ─────────────────────────────────────────────
function renderText() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
  $('.lang-toggle').textContent = t('lang');
  $('.piece-close').setAttribute('aria-label', t('close'));
  $('.about-text').textContent = CONFIG.about[state.lang];
  $('.shipping-text').textContent = CONFIG.shipping[state.lang];
  const links = [`<a href="mailto:${escapeHtml(CONFIG.email)}">${escapeHtml(CONFIG.email)}</a>`];
  if (CONFIG.instagram) links.push(`<a href="${escapeHtml(CONFIG.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
  $('.contact-links').innerHTML = links.join('');
  $('.year').textContent = new Date().getFullYear();
}

// ── Gallery ─────────────────────────────────────────────────
function renderGrid() {
  const list = state.filter === 'available' ? state.artworks.filter((a) => !a.sold) : state.artworks;
  $('.demo-note').hidden = !state.demo;
  $('.empty').hidden = list.length > 0;
  $('.grid').innerHTML = list.map((a) => `
    <button type="button" class="card${a.sold ? ' is-sold' : ''}" data-id="${escapeHtml(a.id)}">
      <div class="card-frame">
        ${a.image ? `<img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy">` : ''}
        ${a.sold ? `<span class="badge">${t('sold')}</span>` : ''}
      </div>
      <div class="card-text">
        <div>
          <div class="card-title">${escapeHtml(a.title)}</div>
          <div class="card-sub">${escapeHtml([a.medium, a.dimensions].filter(Boolean).join(' · '))}</div>
        </div>
        <div class="card-price">${money(a.price, a.currency)}</div>
      </div>
    </button>`).join('');
  document.querySelectorAll('.filters button').forEach((b) => b.classList.toggle('is-active', b.dataset.filter === state.filter));
}

// ── Piece detail ────────────────────────────────────────────
function openPiece(id) {
  const a = state.artworks.find((x) => x.id === id);
  if (!a) return;
  const d = $('dialog.piece');
  $('.piece-media img', d).src = a.image || '';
  $('.piece-media img', d).alt = a.title;
  $('.piece-title', d).textContent = a.title;
  $('.piece-meta', d).textContent = [a.medium, a.dimensions, a.year].filter(Boolean).join(' · ');
  $('.piece-desc', d).textContent = a.description;
  $('.piece-price', d).textContent = a.sold ? t('sold') : money(a.price, a.currency);
  const buy = $('.buy', d);
  buy.hidden = a.sold || !a.url;
  buy.textContent = t('buy');
  buy.href = a.url || '#';
  $('.piece-sold-note', d).textContent = a.sold ? t('soldNote') : '';
  d.showModal();
}

// ── Data ────────────────────────────────────────────────────
async function load() {
  try {
    const res = await fetch('/api/artworks', { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    if (data.demo) throw new Error('demo');
    state.artworks = data.artworks || [];
    state.demo = false;
  } catch (_) {
    state.artworks = demoArtworks();
    state.demo = true;
  }
  renderGrid();
}

// Watercolour-style artwork, used for the hero and for sample pieces.
// Deterministic: the same seed always paints the same picture.
function watercolour(seed, palette, { round = true, w = 400, h = 500, paper = '#fdfcf9' } = {}) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.38;
  const blooms = [];
  for (let i = 0; i < 9; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * R * 0.75;
    const r = R * (0.22 + rnd() * 0.22);
    const c = palette[i % palette.length];
    blooms.push(`<ellipse cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * (0.75 + rnd() * 0.4)).toFixed(1)}" fill="${c}" opacity="${(0.55 + rnd() * 0.3).toFixed(2)}" transform="rotate(${Math.round(rnd() * 180)} ${cx} ${cy})"/>`);
  }
  const marks = [];
  for (let i = 0; i < 26; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * R * 0.92;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
    const c = palette[Math.floor(rnd() * palette.length)];
    marks.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(3 + rnd() * 4).toFixed(1)}" ry="${(8 + rnd() * 7).toFixed(1)}" fill="${c}" opacity=".9" transform="rotate(${Math.round(-30 + rnd() * 60)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`);
  }
  const clip = round ? `<clipPath id="c"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
    <defs>${clip}
      <filter id="wc" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="${seed % 97}"/>
        <feDisplacementMap in="SourceGraphic" scale="34"/>
        <feGaussianBlur stdDeviation="1.2"/>
      </filter>
      <filter id="mk"><feTurbulence baseFrequency="0.06" numOctaves="2" seed="${seed % 89}"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="${paper}"/>
    <g ${round ? 'clip-path="url(#c)"' : ''}>
      <g filter="url(#wc)" style="mix-blend-mode:multiply">${blooms.join('')}</g>
      <g filter="url(#mk)">${marks.join('')}</g>
    </g>
    ${round ? `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#cfc9c0" stroke-width="0.8"/>` : ''}
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Sample pieces shown until Stripe is connected
function demoArtworks() {
  const P = {
    sunset: ['#f2a03d', '#e8613c', '#d93a6a', '#f7c948'],
    berry: ['#8e2d6e', '#1d8a85', '#5b2a86', '#2fb39e'],
    ocean: ['#1f5fa8', '#3fa7c9', '#9fd3e6', '#173a7a'],
    garden: ['#2f8f6b', '#a8c94f', '#e0c341', '#1e5e57'],
    candy: ['#e65fa0', '#f6a6c8', '#7fc8e8', '#f5d36b'],
    dusk: ['#3b3a8c', '#8a4fb5', '#d9669b', '#1d8a85'],
  };
  const sample = 'Exemple de description : ce qui a inspiré la pièce, les couleurs, le moment. / Sample description.';
  return [
    { id: 'd1', title: 'Coucher de soleil', palette: P.sunset, seed: 11, price: 18000, sold: false },
    { id: 'd2', title: 'Baies sauvages', palette: P.berry, seed: 23, price: 22000, sold: false },
    { id: 'd3', title: 'Marée', palette: P.ocean, seed: 37, price: 15000, sold: true },
    { id: 'd4', title: 'Jardin d’août', palette: P.garden, seed: 41, price: 24000, sold: false },
    { id: 'd5', title: 'Bonbons', palette: P.candy, seed: 53, price: 12000, sold: false },
    { id: 'd6', title: 'Crépuscule', palette: P.dusk, seed: 67, price: 26000, sold: true },
  ].map((a) => ({
    ...a, currency: 'cad', url: a.sold ? null : '#', year: '2026',
    medium: 'Aquarelle / Watercolour', dimensions: '23 × 30 cm', description: sample,
    image: watercolour(a.seed, a.palette),
  })).sort((a, b) => Number(a.sold) - Number(b.sold));
}

// Hero painting
function renderHero() {
  const el = document.querySelector('.hero-art');
  if (el) el.innerHTML = `<img src="${watercolour(7, ['#d93a6a', '#1d8a85', '#f2a03d', '#5b2a86', '#2fb39e'], { w: 600, h: 600, paper: 'transparent' })}" alt="">`;
}

// ── Events ──────────────────────────────────────────────────
$('.grid').addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) openPiece(card.dataset.id);
});
document.querySelectorAll('.filters button').forEach((b) =>
  b.addEventListener('click', () => { state.filter = b.dataset.filter; renderGrid(); }));
$('.lang-toggle').addEventListener('click', () => {
  state.lang = state.lang === 'fr' ? 'en' : 'fr';
  try { localStorage.setItem('lang', state.lang); } catch (_) {}
  renderText(); renderGrid();
});
const dialog = $('dialog.piece');
$('.piece-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
$('.buy').addEventListener('click', (e) => {
  if (state.demo) { e.preventDefault(); alert(state.lang === 'fr' ? 'Aperçu : le paiement sera actif une fois Stripe branché.' : 'Preview: checkout goes live once Stripe is connected.'); }
});

// ── Preview-only palette switcher (never shown on the real site) ──
function paletteSwitcher() {
  const host = location.hostname;
  const isPreview = host.startsWith('preview-') || host === 'localhost' || location.protocol === 'file:';
  if (!isPreview) return;
  const options = [
    ['ochre', 'Ochre Paper', '#b07d24', '#f7f2e7'],
    ['clay', 'Blush Clay', '#b56d5f', '#fbf5f2'],
    ['linen', 'Warm Linen', '#8a5a44', '#f5f0e8'],
    ['sage', 'Studio Sage', '#4f6f5e', '#f3f4ef'],
    ['plum', 'Ink & Plum', '#6b3f6e', '#faf8f7'],
  ];
  let current = 'ochre';
  try { current = localStorage.getItem('palette') || 'ochre'; } catch (_) {}
  const apply = (key) => {
    if (key === 'ochre') document.documentElement.removeAttribute('data-palette');
    else document.documentElement.setAttribute('data-palette', key);
    try { localStorage.setItem('palette', key); } catch (_) {}
    box.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.key === key));
  };
  const box = document.createElement('div');
  box.className = 'palette-switcher';
  box.innerHTML = '<p>Preview only · colour palette</p><div class="opts">' + options.map(([k, n, a, b]) =>
    `<button type="button" data-key="${k}"><i style="background:linear-gradient(135deg, ${b} 50%, ${a} 50%)"></i>${n}</button>`).join('') + '</div>';
  box.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) apply(b.dataset.key); });
  document.body.appendChild(box);
  apply(current);
}

renderText();
renderHero();
paletteSwitcher();
load();
