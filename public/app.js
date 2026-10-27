// ────────────────────────────────────────────────────────────
// Site settings — the easy things to change live here.
// ────────────────────────────────────────────────────────────
const CONFIG = {
  email: 'bonjour@artbyapl.com',
  instagram: '', // e.g. 'https://instagram.com/artbyapl'
  about: {
    fr: "[À compléter : quelques phrases sur l’artiste, sa démarche, ses matériaux, d’où elle peint.]",
    en: "[To fill in: a few sentences about the artist, her approach, her materials, where she paints.]",
  },
  shipping: {
    fr: "[À compléter : livraison au Canada, ramassage à Montréal, délais, emballage…]",
    en: "[To fill in: shipping within Canada, local pickup in Montréal, timelines, packaging…]",
  },
};

const TEXT = {
  fr: {
    navWorks: 'Œuvres', navAbout: 'À propos', navContact: 'Contact',
    heroTitle: 'Œuvres originales.<br><em>Une seule de chaque.</em>',
    heroSub: 'Chaque pièce est unique. Quand elle trouve sa maison, elle ne revient pas.',
    filterAvailable: 'Disponibles', filterAll: 'Toutes',
    demo: 'Aperçu — œuvres d’exemple',
    empty: 'Aucune œuvre disponible pour le moment. Revenez bientôt!',
    buy: 'Acheter cette œuvre', sold: 'Vendue',
    soldNote: 'Cette œuvre a trouvé sa maison. Écrivez-moi si ce style vous plaît.',
    shippingTitle: 'Livraison',
    contactText: 'Une question sur une œuvre ou envie d’une commande personnalisée?',
    secure: 'Paiement sécurisé par Stripe',
    close: 'Fermer', lang: 'EN',
  },
  en: {
    navWorks: 'Works', navAbout: 'About', navContact: 'Contact',
    heroTitle: 'Original artwork.<br><em>One of each.</em>',
    heroSub: 'Every piece is unique. Once it finds its home, it’s gone.',
    filterAvailable: 'Available', filterAll: 'All',
    demo: 'Preview — sample artworks',
    empty: 'No pieces available right now. Check back soon!',
    buy: 'Buy this piece', sold: 'Sold',
    soldNote: 'This piece has found its home. Write to me if you like this style.',
    shippingTitle: 'Shipping',
    contactText: 'A question about a piece, or interested in a commission?',
    secure: 'Secure payment by Stripe',
    close: 'Close', lang: 'FR',
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

// Sample pieces shown until Stripe is connected
function demoArtworks() {
  const art = (bg, shapes) => 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="${bg}"/>${shapes}</svg>`);
  return [
    { id: 'd1', title: 'Marée basse', medium: 'Acrylique sur toile', dimensions: '40 × 50 cm', year: '2026', price: 42000, currency: 'cad', sold: false, url: '#',
      description: 'Exemple de description : ce qui a inspiré la pièce, les couleurs, le moment.',
      image: art('#e9dcc6', '<circle cx="250" cy="170" r="90" fill="#c96a3b"/><rect y="300" width="400" height="200" fill="#2f4858"/><rect y="270" width="400" height="40" fill="#86a3a8"/>') },
    { id: 'd2', title: 'Fenêtre sur janvier', medium: 'Huile sur panneau', dimensions: '30 × 30 cm', year: '2026', price: 28000, currency: 'cad', sold: false, url: '#',
      description: 'Exemple de description.',
      image: art('#dfe4e6', '<rect x="60" y="70" width="280" height="360" fill="#f7f5f0"/><rect x="60" y="250" width="280" height="8" fill="#37474f"/><rect x="196" y="70" width="8" height="360" fill="#37474f"/><circle cx="120" cy="140" r="26" fill="#b4532a"/>') },
    { id: 'd3', title: 'Jardin, fin d’août', medium: 'Gouache sur papier', dimensions: '23 × 30 cm', year: '2025', price: 18000, currency: 'cad', sold: true,
      description: 'Exemple de description.',
      image: art('#f1e7d3', '<ellipse cx="130" cy="330" rx="110" ry="150" fill="#6b8f5e"/><ellipse cx="290" cy="300" rx="90" ry="170" fill="#3f6b4f"/><circle cx="200" cy="120" r="55" fill="#e2a33b"/>') },
    { id: 'd4', title: 'Rouge Saint-Laurent', medium: 'Acrylique sur toile', dimensions: '60 × 75 cm', year: '2026', price: 75000, currency: 'cad', sold: false, url: '#',
      description: 'Exemple de description.',
      image: art('#2b2a33', '<path d="M0 340 Q200 260 400 340 L400 500 L0 500Z" fill="#8c2f1d"/><path d="M0 390 Q200 330 400 400 L400 500 L0 500Z" fill="#c45a2c"/><circle cx="110" cy="130" r="40" fill="#efe6d8"/>') },
    { id: 'd5', title: 'Petite étude bleue', medium: 'Encre et aquarelle', dimensions: '18 × 24 cm', year: '2025', price: 12000, currency: 'cad', sold: false, url: '#',
      description: 'Exemple de description.',
      image: art('#f4f1ea', '<circle cx="200" cy="230" r="130" fill="#3d5a80" opacity=".85"/><circle cx="250" cy="290" r="90" fill="#98c1d9" opacity=".8"/>') },
    { id: 'd6', title: 'Dimanche matin', medium: 'Huile sur toile', dimensions: '50 × 50 cm', year: '2025', price: 54000, currency: 'cad', sold: true,
      description: 'Exemple de description.',
      image: art('#e8d5c4', '<rect x="70" y="90" width="260" height="320" rx="130" fill="#d98f6a"/><rect x="140" y="160" width="120" height="180" rx="60" fill="#f6efe6"/>') },
  ].sort((a, b) => Number(a.sold) - Number(b.sold));
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

renderText();
load();
