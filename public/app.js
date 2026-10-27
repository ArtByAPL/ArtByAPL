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
  // Big image at the top: one piece, cropped to the artwork itself (no frame, white mat or brushes).
  // cx / cy = centre of the piece, w = its width, all measured in photo widths (1 = full photo width).
  // ratio = the piece's width / height (5×7 = 5 / 7).
  hero: {
    image: 'https://i.etsystatic.com/65548102/r/il/c56794/8717752002/il_fullxfull.8717752002_rra8.jpg',
    title: 'Forest Walk', cx: 0.4815, cy: 0.668, w: 0.44, ratio: 5 / 7,
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
// Show just the artwork from a styled photo. crop = { cx, cy, w, ratio } in photo widths.
function croppedArt(src, crop, alt, frameRatio) {
  const scale = 100 / crop.w;
  const left = 50 - (crop.cx / crop.w) * 100;
  const top = 50 - (crop.cy / crop.w) * crop.ratio * 100;
  // Fit the piece inside its frame: tall pieces fill the height, wide ones the width
  const size = frameRatio && crop.ratio > frameRatio ? 'width:100%;height:auto' : 'height:100%;width:auto';
  return `<div class="art-crop" style="aspect-ratio:${crop.ratio};${frameRatio ? size : ''}"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy"
    style="width:${scale}%;left:${left}%;top:${top}%"></div>`;
}

function renderGrid() {
  const list = state.filter === 'available' ? state.artworks.filter((a) => !a.sold) : state.artworks;
  $('.demo-note').hidden = !state.demo;
  $('.empty').hidden = list.length > 0;
  $('.grid').innerHTML = list.map((a) => `
    <button type="button" class="card${a.sold ? ' is-sold' : ''}" data-id="${escapeHtml(a.id)}">
      <div class="card-frame${a.crop ? ' has-crop' : ''}">
        ${a.image && a.crop ? croppedArt(a.cropImage || a.image, a.crop, a.title, 0.8)
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
  const base = 'https://i.etsystatic.com/65548102/r/il/';
  const photo = (p, size) => base + p.replace('/', `/`).replace(/\/(\d+_[a-z0-9]+\.jpg)$/, `/${size}.$1`);
  const small = { medium: 'Watercolour', dimensions: '5×7 in · matted 8×10', price: 3700 };
  // [title, shape, cover photo (styled, for the detail view), straight-on photo, crop of the piece in that photo, extras]
  const list = [
    ['Forest Walk', 'circular', 'c56794/8717752002/8717752002_rra8.jpg', '793628/8765580965/8765580965_lacq.jpg', [0.495, 0.6512, 0.536, 0.702]],
    ['Deep Blues', 'circular', 'd4186a/8717754902/8717754902_beay.jpg', '3ef490/8765552793/8765552793_tdbl.jpg', [0.495, 0.6575, 0.506, 0.7067]],
    ['Mystic Purple', 'circular', 'c2cdca/8765532701/8765532701_hiij.jpg', 'eddd01/8765533149/8765533149_bgj6.jpg', [0.495, 0.645, 0.531, 0.6978]],
    ['Autumn Hues', 'circular', 'c43ae7/8719639061/8719639061_c3mt.jpg', 'eafb4b/8671807012/8671807012_ntv2.jpg', [0.4975, 0.6563, 0.541, 0.6994]],
    ['Mountain Landscape', 'landscape', 'fd846b/8719437285/8719437285_4d8t.jpg', 'fd846b/8719437285/8719437285_4d8t.jpg', [0.4715, 0.668, 0.7, 1], { dimensions: '8×10 in', price: 4500 }],
    ['Soft Pinks', 'circular', 'c42162/8649433058/8649433058_d07g.jpg', 'ce31bd/8697260145/8697260145_8zmk.jpg', [0.4987, 0.6425, 0.5135, 0.6883]],
    ['Violet Green', 'circular', 'e63de7/8692402585/8692402585_9mo4.jpg', '93fd4c/8692402617/8692402617_3rjo.jpg', [0.4938, 0.66, 0.5285, 0.7084]],
    ['Tidal Blues', 'rectangular', '4a1471/8680551141/8680551141_tpnm.jpg', 'cadacc/8680551971/8680551971_7p2y.jpg', [0.4912, 0.6663, 0.5185, 0.6927]],
    ['Purple Hues', 'rectangular', '405d64/8680494853/8680494853_ba76.jpg', '16f49f/8680495685/8680495685_7xwl.jpg', [0.49, 0.6625, 0.511, 0.6943]],
    ['Blue Hues', 'rectangular', '296142/8632553924/8632553924_p4jh.jpg', '1ff1bc/8680374357/8680374357_3dj6.jpg', [0.49, 0.6387, 0.516, 0.7083]],
    ['Autumn Hues', 'rectangular', '8935ac/8632488298/8632488298_tlhv.jpg', '07b2de/8680346509/8680346509_4ppm.jpg', [0.5012, 0.6625, 0.4935, 0.699]],
    ['Purple Hues', 'circular', '470ffa/8629130604/8629130604_czsn.jpg', 'a4e2e8/8629129736/8629129736_suc7.jpg', [0.51, 0.6762, 0.526, 0.6935]],
    ['Teal Hues', 'circular', 'd19715/8676739643/8676739643_k0ew.jpg', '53e9bf/8628915072/8628915072_opaq.jpg', [0.5125, 0.66, 0.506, 0.727]],
    ['Violet Hues', 'circular', '96dd79/8628833042/8628833042_biqq.jpg', 'fe03e1/8628853786/8628853786_gkzm.jpg', [0.5012, 0.6825, 0.5035, 0.6983]],
    ['Pink Hues', 'circular', '79cc31/8676594837/8676594837_76am.jpg', '5011fd/8628797878/8628797878_b4x2.jpg', [0.49, 0.6587, 0.506, 0.7042]],
    ['Blue Hues', 'circular', '701bd2/8676812045/8676812045_jgzo.jpg', 'ad167a/8628986810/8628986810_r68z.jpg', [0.4988, 0.645, 0.5385, 0.7076]],
    ['Blues Hues', 'watercolour & oil pastel', '4a159c/8133440957/8133440957_9aku.jpg', '4a159c/8133440957/8133440957_9aku.jpg', [0.4233, 0.792, 0.6235, 0.7735], { medium: 'Watercolour & oil pastel', dimensions: '8×10 in', price: 4500 }],
  ];
  return list.map(([title, shape, cover, straight, c, extra = {}], i) => {
    const d = { ...small, ...extra };
    const medium = extra.medium || (shape === 'landscape' ? 'Watercolour landscape' : `Watercolour · ${shape}`);
    return {
      id: 'etsy' + i, title, currency: 'cad', sold: false, url: '#', year: '',
      image: photo(cover, 'il_794xN'),
      cropImage: photo(straight, 'il_1140xN'),
      crop: { cx: c[0], cy: c[1], w: c[2], ratio: c[3] },
      medium, dimensions: d.dimensions, price: d.price,
      description: `Original ${medium.toLowerCase()} painting by Allie Paige, ${d.dimensions}.`,
    };
  });
}

// Hero image: the piece chosen in CONFIG.hero, cropped to the artwork itself
function renderHero() {
  const el = document.querySelector('.hero-art');
  if (!el) return;
  const h = CONFIG.hero;
  el.innerHTML = h && h.image
    ? `<div class="hero-crop">${croppedArt(h.image, { cx: h.cx, cy: h.cy, w: h.w, ratio: h.ratio }, h.title)}</div>`
    : `<img src="${watercolour(7, ['#d93a6a', '#1d8a85', '#f2a03d', '#5b2a86', '#2fb39e'], { w: 600, h: 600, paper: 'transparent' })}" alt="">`;
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
