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
  // Big image at the top: one piece, edited and hosted in /art
  hero: { image: '/art/forest-walk.jpg', title: 'Forest Walk' },
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
    back: '← Toutes les œuvres', unique: 'Pièce unique, il n’y en a qu’une.', details: 'Détails',
    mediumLabel: 'Technique', sizeLabel: 'Format', mockNote: 'Encadrement montré à titre d’illustration.',
    demoBuy: 'Aperçu : le paiement sera actif une fois Stripe branché.', notFound: 'Œuvre introuvable.',
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
    back: '← All works', unique: 'One of a kind: there is only one.', details: 'Details',
    mediumLabel: 'Medium', sizeLabel: 'Size', mockNote: 'Shown framed for illustration.',
    demoBuy: 'Preview: checkout goes live once Stripe is connected.', notFound: 'Piece not found.',
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
  const set = (sel, prop, val) => { const el = $(sel); if (el) el[prop] = val; };
  set('.lang-toggle', 'textContent', t('lang'));
  set('.about-text', 'textContent', CONFIG.about[state.lang]);
  set('.shipping-text', 'textContent', CONFIG.shipping[state.lang]);
  const links = [`<a href="mailto:${escapeHtml(CONFIG.email)}">${escapeHtml(CONFIG.email)}</a>`];
  if (CONFIG.instagram) links.push(`<a href="${escapeHtml(CONFIG.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
  set('.contact-links', 'innerHTML', links.join(''));
  set('.year', 'textContent', new Date().getFullYear());
}

// ── Gallery ─────────────────────────────────────────────────
function renderGrid() {
  const list = state.filter === 'available' ? state.artworks.filter((a) => !a.sold) : state.artworks;
  $('.demo-note').hidden = !state.demo;
  $('.empty').hidden = list.length > 0;
  $('.grid').innerHTML = list.map((a) => `
    <a class="card${a.sold ? ' is-sold' : ''}" href="/piece.html?p=${encodeURIComponent(a.id)}">
      <div class="card-frame${a.thumb ? ' has-print' : ''}">
        ${a.thumb ? `<img class="print" src="${escapeHtml(a.thumb)}" alt="${escapeHtml(a.title)}" loading="lazy">`
          : a.image ? `<img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy">` : ''}
        ${a.sold ? `<span class="badge">${t('sold')}</span>` : ''}
      </div>
      <div class="card-text">
        <div>
          <div class="card-title">${escapeHtml(a.title)}</div>
          <div class="card-sub">${escapeHtml([a.medium, a.dimensions].filter(Boolean).join(' · '))}</div>
        </div>
        <div class="card-price">${money(a.price, a.currency)}</div>
      </div>
    </a>`).join('');
  document.querySelectorAll('.filters button').forEach((b) => b.classList.toggle('is-active', b.dataset.filter === state.filter));
}

// ── Listing page (piece.html?p=…) ───────────────────────────
function localized(v) { return v && typeof v === 'object' ? (v[state.lang] || v.en || '') : (v || ''); }

function renderListing() {
  const root = $('.listing');
  const id = new URLSearchParams(location.search).get('p');
  const a = state.artworks.find((x) => x.id === id);
  if (!a) { root.innerHTML = `<p class="empty">${t('notFound')}</p>`; return; }
  document.title = `${a.title} · ArtBy APL`;
  const gallery = a.gallery || [a.art || a.image, a.image].filter(Boolean).map((src) => ({ src }));
  const current = Math.min(state.slide || 0, gallery.length - 1);
  const g = gallery[current];
  root.innerHTML = `
    <a class="back" href="/#oeuvres">${t('back')}</a>
    <div class="listing-grid">
      <div class="listing-gallery">
        <div class="listing-main${g.fill ? ' is-fill' : ''}"><img src="${escapeHtml(g.src)}" alt="${escapeHtml(a.title)}"></div>
        <p class="mock-note"${g.mock ? '' : ' hidden'}>${t('mockNote')}</p>
        ${gallery.length > 1 ? `<div class="thumbs">${gallery.map((x, i) => `
          <button type="button" class="thumb${i === current ? ' on' : ''}" data-i="${i}" aria-label="${i + 1}/${gallery.length}">
            <img src="${escapeHtml(x.src)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
      </div>
      <div class="listing-info">
        <h1>${escapeHtml(a.title)}</h1>
        <p class="listing-price">${a.sold ? t('sold') : money(a.price, a.currency)}</p>
        <p class="listing-unique">${a.sold ? t('soldNote') : t('unique')}</p>
        ${a.sold || !a.url ? '' : `<a class="buy" href="${escapeHtml(a.url)}">${t('buy')}</a>`}
        <p class="demo-buy" hidden>${t('demoBuy')}</p>
        <p class="listing-desc">${escapeHtml(localized(a.description))}</p>
        <h2>${t('details')}</h2>
        <dl class="listing-details">
          ${a.medium ? `<dt>${t('mediumLabel')}</dt><dd>${escapeHtml(localized(a.medium))}</dd>` : ''}
          ${a.dimensions ? `<dt>${t('sizeLabel')}</dt><dd>${escapeHtml(localized(a.dimensions))}</dd>` : ''}
          <dt>${t('shippingTitle')}</dt><dd>${escapeHtml(CONFIG.shipping[state.lang])}</dd>
        </dl>
        <p class="listing-secure">${t('secure')}</p>
      </div>
    </div>`;
  root.querySelectorAll('.thumb').forEach((b) => b.addEventListener('click', () => { state.slide = +b.dataset.i; renderListing(); }));
  const buy = $('.buy', root);
  if (buy && state.demo) buy.addEventListener('click', (e) => { e.preventDefault(); $('.demo-buy', root).hidden = false; });
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
  if ($('.grid')) renderGrid();
  if ($('.listing')) renderListing();
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
  // Allie's current Etsy pieces. Photos edited for the web and hosted on the site, in /art:
  //   <slug>-sm.jpg = the piece alone (cards) · <slug>.jpg = large · <slug>-styled.jpg = framed shot (detail view)
  const small = { medium: 'Watercolour', dimensions: '5×7 in · matted 8×10', price: 3700 };
  const list = [
    ['forest-walk', 'Forest Walk', 'circular'],
    ['deep-blues', 'Deep Blues', 'circular'],
    ['mystic-purple', 'Mystic Purple', 'circular'],
    ['autumn-hues-circular', 'Autumn Hues', 'circular'],
    ['mountain-landscape', 'Mountain Landscape', 'landscape', { dimensions: '8×10 in', price: 4500 }],
    ['soft-pinks', 'Soft Pinks', 'circular'],
    ['violet-green', 'Violet Green', 'circular'],
    ['tidal-blues', 'Tidal Blues', 'rectangular'],
    ['purple-hues-rectangular', 'Purple Hues', 'rectangular'],
    ['blue-hues-rectangular', 'Blue Hues', 'rectangular'],
    ['autumn-hues-rectangular', 'Autumn Hues', 'rectangular'],
    ['purple-hues-circular', 'Purple Hues', 'circular'],
    ['teal-hues', 'Teal Hues', 'circular'],
    ['violet-hues', 'Violet Hues', 'circular'],
    ['pink-hues', 'Pink Hues', 'circular'],
    ['blue-hues-circular', 'Blue Hues', 'circular'],
    ['blues-hues', 'Blues Hues', 'watercolour & oil pastel', { medium: 'Watercolour & oil pastel', dimensions: '8×10 in', price: 4500 }],
  ];
  // Example of a full listing photo set: the piece, framed, two room mock-ups, a close-up, her own photo
  const extraGallery = {
    'forest-walk': [
      { src: '/art/forest-walk.jpg' },
      { src: '/art/forest-walk-framed.jpg', mock: true, fill: true },
      { src: '/art/forest-walk-wall.jpg', mock: true, fill: true },
      { src: '/art/forest-walk-shelf.jpg', mock: true, fill: true },
      { src: '/art/forest-walk-detail.jpg', fill: true },
      { src: '/art/forest-walk-styled.jpg', fill: true },
    ],
  };
  const descriptions = {
    'forest-walk': {
      en: 'Deep teals, forest greens and earthy browns, with touches of gold and pencil detail, painted in a circle and set on a deep plum backdrop. Painted intuitively in watercolour and mixed media on paper.',
      fr: 'Des sarcelles profonds, des verts forêt et des bruns terreux, avec des touches d’or et des détails au crayon, peints dans un cercle sur un fond prune foncé. Peinte de façon intuitive à l’aquarelle et en techniques mixtes sur papier.',
    },
  };
  return list.map(([slug, title, shape, extra = {}]) => {
    const d = { ...small, ...extra };
    const medium = extra.medium || (shape === 'landscape' ? 'Watercolour landscape' : `Watercolour · ${shape}`);
    return {
      id: slug, title, currency: 'cad', sold: false, url: '#', year: '',
      thumb: `/art/${slug}-sm.jpg`, art: `/art/${slug}.jpg`, image: `/art/${slug}-styled.jpg`,
      gallery: extraGallery[slug] || [{ src: `/art/${slug}.jpg` }, { src: `/art/${slug}-styled.jpg`, fill: true }],
      medium, dimensions: d.dimensions, price: d.price,
      description: descriptions[slug] || {
        en: `Original ${medium.toLowerCase()} painting by Allie Paige, ${d.dimensions}.`,
        fr: `Aquarelle originale d’Allie Paige, ${d.dimensions}.`,
      },
    };
  });
}

// Hero image: the piece chosen in CONFIG.hero
function renderHero() {
  const el = document.querySelector('.hero-art');
  if (!el) return;
  const h = CONFIG.hero;
  el.innerHTML = h && h.image
    ? `<div class="hero-crop"><img class="print" src="${escapeHtml(h.image)}" alt="${escapeHtml(h.title)}"></div>`
    : `<img src="${watercolour(7, ['#d93a6a', '#1d8a85', '#f2a03d', '#5b2a86', '#2fb39e'], { w: 600, h: 600, paper: 'transparent' })}" alt="">`;
}

// ── Events ──────────────────────────────────────────────────
document.querySelectorAll('.filters button').forEach((b) =>
  b.addEventListener('click', () => { state.filter = b.dataset.filter; renderGrid(); }));
$('.lang-toggle')?.addEventListener('click', () => {
  state.lang = state.lang === 'fr' ? 'en' : 'fr';
  try { localStorage.setItem('lang', state.lang); } catch (_) {}
  renderText();
  if ($('.grid')) renderGrid();
  if ($('.listing')) renderListing();
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
