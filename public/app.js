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
  // Big image at the top: one painting, cropped to just the artwork (no frame or mat).
  // cx / cy = centre of the painting and d = its diameter, all measured in photo widths (1 = full photo width).
  hero: {
    image: 'https://i.etsystatic.com/65548102/r/il/c56794/8717752002/il_fullxfull.8717752002_rra8.jpg',
    title: 'Forest Walk', cx: 0.48, cy: 0.645, d: 0.39,
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
    demo: 'Aperçu — œuvres de la boutique Etsy, paiement pas encore actif',
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
    demo: 'Preview — pieces from the Etsy shop, checkout not live yet',
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

// Sample pieces shown until Stripe is connected: Allie's current Etsy listings (photos hosted by Etsy).
function demoArtworks() {
  const img = (path) => `https://i.etsystatic.com/65548102/r/il/${path}`;
  const small = { medium: 'Watercolour', dimensions: '5×7 in · matted 8×10', price: 3700 };
  const list = [
    ['Forest Walk', 'circular', 'c56794/8717752002/il_800x800.8717752002_rra8.jpg'],
    ['Deep Blues', 'circular', 'd4186a/8717754902/il_800x800.8717754902_beay.jpg'],
    ['Mystic Purple', 'circular', 'c2cdca/8765532701/il_800x800.8765532701_hiij.jpg'],
    ['Autumn Hues', 'circular', 'c43ae7/8719639061/il_800x800.8719639061_c3mt.jpg'],
    ['Mountain Landscape', 'landscape', 'fd846b/8719437285/il_800x800.8719437285_4d8t.jpg', { dimensions: '8×10 in', price: 4500 }],
    ['Soft Pinks', 'circular', 'c42162/8649433058/il_800x800.8649433058_d07g.jpg'],
    ['Violet Green', 'circular', 'e63de7/8692402585/il_800x800.8692402585_9mo4.jpg'],
    ['Tidal Blues', 'rectangular', '4a1471/8680551141/il_800x800.8680551141_tpnm.jpg'],
    ['Purple Hues', 'rectangular', '405d64/8680494853/il_800x800.8680494853_ba76.jpg'],
    ['Blue Hues', 'rectangular', '296142/8632553924/il_800x800.8632553924_p4jh.jpg'],
    ['Autumn Hues', 'rectangular', '8935ac/8632488298/il_800x800.8632488298_tlhv.jpg'],
    ['Purple Hues', 'circular', '470ffa/8629130604/il_800x800.8629130604_czsn.jpg'],
    ['Teal Hues', 'circular', 'd19715/8676739643/il_800x800.8676739643_k0ew.jpg'],
    ['Violet Hues', 'circular', '96dd79/8628833042/il_800x800.8628833042_biqq.jpg'],
    ['Pink Hues', 'circular', '79cc31/8676594837/il_800x800.8676594837_76am.jpg'],
    ['Blue Hues', 'circular', '701bd2/8676812045/il_800x800.8676812045_jgzo.jpg'],
    ['Blues Hues', 'watercolour & oil pastel', '4a159c/8133440957/il_800x800.8133440957_9aku.jpg', { medium: 'Watercolour & oil pastel', dimensions: '8×10 in', price: 4500 }],
  ];
  return list.map(([title, shape, path, extra = {}], i) => {
    const d = { ...small, ...extra };
    const medium = extra.medium || (shape === 'landscape' ? 'Watercolour landscape' : `Watercolour · ${shape}`);
    return {
      id: 'etsy' + i, title, image: img(path), currency: 'cad', sold: false, url: '#', year: '',
      medium, dimensions: d.dimensions, price: d.price,
      description: `Original ${medium.toLowerCase()} painting by Allie Paige, ${d.dimensions}.`,
    };
  });
}

// Hero image: the painting chosen in CONFIG.hero, cropped to a clean circle
function renderHero() {
  const el = document.querySelector('.hero-art');
  if (!el) return;
  const h = CONFIG.hero;
  if (!h || !h.image) {
    el.innerHTML = `<img src="${watercolour(7, ['#d93a6a', '#1d8a85', '#f2a03d', '#5b2a86', '#2fb39e'], { w: 600, h: 600, paper: 'transparent' })}" alt="">`;
    return;
  }
  const scale = 100 / h.d;
  el.innerHTML = `<div class="hero-crop"><img src="${escapeHtml(h.image)}" alt="${escapeHtml(h.title)}"
    style="width:${scale}%;left:${50 - h.cx * scale}%;top:${50 - h.cy * scale}%"></div>`;
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

// ── Preview-only font switcher (never shown on the real site) ──
function fontSwitcher() {
  const host = location.hostname;
  const isPreview = host.startsWith('preview-') || host === 'localhost' || location.protocol === 'file:';
  if (!isPreview) return;
  const options = [
    ['dmserif', 'DM Serif', "'DM Serif Display'"],
    ['fraunces', 'Fraunces', "'Fraunces'"],
  ];
  let current = 'dmserif';
  try { const f = localStorage.getItem('font'); if (f === 'dmserif' || f === 'fraunces') current = f; } catch (_) {}
  const box = document.createElement('div');
  box.className = 'palette-switcher';
  box.innerHTML = '<p>Preview only · title font (still deciding)</p><div class="opts">' + options.map(([k, n, f]) =>
    `<button type="button" data-key="${k}" style="font-family:${f};font-size:.95rem">${n}</button>`).join('') + '</div>';
  const apply = (key) => {
    document.documentElement.setAttribute('data-font', key);
    try { localStorage.setItem('font', key); } catch (_) {}
    box.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.key === key));
  };
  box.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) apply(b.dataset.key); });
  document.body.appendChild(box);
  apply(current);
}

renderText();
renderHero();
fontSwitcher();
load();
