// ────────────────────────────────────────────────────────────
// Site settings — the easy things to change live here.
// ────────────────────────────────────────────────────────────
const CONFIG = {
  email: 'hello@artbyapl.com',
  instagram: 'https://www.instagram.com/artby_apl/',
  name: 'Alexandra Paige',
  tagline: {
    fr: 'Explorer les moments, les humeurs et les souvenirs par le mouvement et la couleur.',
    en: 'Exploring moments, moods, and memories through movement and colour.',
  },
  // Short intro shown on the home page (the full story is on about.html)
  about: {
    fr: "Je m’appelle Alexandra, une artiste aquarelliste inspirée par les lieux qui me font sentir chez moi. Je peins de façon intuitive, en laissant l’eau et le pigment trouver leur propre chemin sur la page, pour saisir l’émotion d’un lieu plutôt que son image exacte.",
    en: "I’m Alexandra, a watercolour artist inspired by the places that feel like home. I paint intuitively, letting water and pigment find their own path across the page, to capture the feeling of a place rather than exactly how it looks.",
  },
  // About the artist page: Alexandra's bio (her own words). Edit freely.
  aboutPage: {
    photo: '/art/alexandra.jpg',
    // More photos of Alexandra, shown in a row under the bio
    photos: ['/art/alexandra-studio.jpg?v=2', '/art/alexandra-trail.jpg', '/art/alexandra-finish.jpg'],
    bio: [
      { en: "I’m Alexandra, a watercolour artist inspired by the places that feel like home.",
        fr: "Je m’appelle Alexandra, une artiste aquarelliste inspirée par les lieux qui me font sentir chez moi." },
      { en: "I paint intuitively, letting water and pigment find their own path across the page. Rather than recreating a landscape exactly as it appears, I’m interested in capturing the feeling of a place: the hush of a misty forest, the warmth of autumn light, the rhythm of the ocean, or the colour of a memory that lingers long after the moment has passed.",
        fr: "Je peins de façon intuitive, en laissant l’eau et le pigment trouver leur propre chemin sur la page. Plutôt que de reproduire un paysage tel qu’il est, je cherche à saisir l’émotion d’un lieu : le silence d’une forêt dans la brume, la chaleur de la lumière d’automne, le rythme de l’océan, ou la couleur d’un souvenir qui persiste longtemps après le moment." },
      { en: "I grew up on the West Coast of Canada, surrounded by mountains, rainforest, and ocean. Nature has always been where I feel most grounded. Many of my ideas arrive while running long trails, wandering through forests, or spending time at our family cabin on a small island off the coast of Vancouver.",
        fr: "J’ai grandi sur la côte Ouest canadienne, entourée de montagnes, de forêt pluviale et d’océan. C’est dans la nature que je me sens le plus ancrée. Bien des idées me viennent en courant de longs sentiers, en me promenant en forêt ou en passant du temps au chalet familial, sur une petite île au large de Vancouver." },
      { en: "Today, I split my time between Canada’s West Coast and Québec, drawing inspiration from both landscapes. The mossy greens, endless coastlines, changing seasons, and quiet moments of everyday life all find their way into my work.",
        fr: "Aujourd’hui, je partage mon temps entre la côte Ouest canadienne et le Québec, et je m’inspire des deux paysages. Les verts moussus, les côtes à perte de vue, les saisons qui changent et les petits moments tranquilles du quotidien se retrouvent tous dans mon travail." },
      { en: "Each piece begins with a feeling, a moment, or a memory. No two are ever quite the same.",
        fr: "Chaque œuvre commence par une émotion, un moment ou un souvenir. Il n’y en a jamais deux tout à fait pareilles." },
    ],
  },
  // Collections: every piece belongs to one. Add a new entry here to start a new collection.
  collections: [
    { id: 'intuitive-abstracts',
      name: { fr: 'Abstractions intuitives', en: 'Intuitive Abstracts' },
      blurb: { fr: 'Des aquarelles abstraites peintes de façon intuitive, souvent dans un cercle, pleines de couleur et de petits motifs.',
               en: 'Abstract watercolours painted intuitively, often within a circle, full of colour and little marks.' } },
  ],
  defaultCollection: 'intuitive-abstracts',
  // Big image at the top: one piece, edited and hosted in /art
  hero: { image: '/art/collection-grid.jpg', title: 'The collection', photo: true },
  shipping: {
    fr: "Livraison gratuite au Canada et aux États-Unis. Expédiée sous 3 à 5 jours ouvrables, bien protégée.",
    en: "Free shipping within Canada and the US. Ships within 3–5 business days, carefully packaged.",
  },
};

const TEXT = {
  fr: {
    navWorks: 'Œuvres', navAbout: 'À propos', navContact: 'Contact',
    heroTitle: 'Aquarelles abstraites.<br><em>Une seule de chaque.</em>',
    heroSub: 'Des œuvres originales signées Alexandra Paige. Chaque pièce est unique : quand elle trouve sa maison, elle ne revient pas.',
    filterAvailable: 'Disponibles', filterAll: 'Toutes',
    demo: 'Aperçu — œuvres de la boutique Etsy, paiement pas encore actif',
    empty: 'Aucune œuvre disponible pour le moment. Revenez bientôt!',
    buy: 'Acheter cette œuvre', sold: 'Vendue', soldOut: 'Vendue',
    soldNote: 'Cette œuvre a trouvé sa maison. Écrivez-moi si ce style vous plaît.',
    shippingTitle: 'Livraison',
    prev: 'Photo précédente', next: 'Photo suivante',
    collection: 'Collection', aboutRead: 'Lire mon histoire →', aboutTitle: 'À propos de l’artiste', aboutCta: 'Voir les œuvres',
    originalLabel: 'Œuvre', originalVal: 'Peinture originale (pas une reproduction)', paperLabel: 'Papier', paperVal: 'Papier aquarelle épais à grain fin (pressé à froid), 140 lb / 300 g/m²', signedLabel: 'Signature', signedVal: 'Signée par l’artiste au verso', presLabel: 'Présentation', presMatted: 'Non encadrée. Livrée dans un passe-partout de 8 × 10 po (20,3 × 25,4 cm), prête à glisser dans un cadre standard.', presUnmatted: 'Non encadrée, sans passe-partout. Entre dans un cadre standard de 8 × 10 po (20,3 × 25,4 cm).', presLarge: 'Non encadrée. Format pensé pour un cadre de 19¾ × 27½ po (50 × 70 cm) avec passe-partout à ouverture de 15¾ × 19¾ po (40 × 50 cm) (montrée dans un cadre IKEA RÖDALM).', shipTitle: 'Livraison et emballage', shipPack: 'Expédiée à plat, dans une pochette protectrice en cellophane.', shipNote: 'Chaque œuvre est accompagnée d’un mot de remerciement écrit à la main par l’artiste.', shipMade: 'Peinte à la main au Québec, Canada.', careTitle: 'Entretien', careText: 'Pour garder les couleurs vives, exposez l’œuvre à l’abri du soleil direct et de l’humidité, idéalement encadrée sous verre. Manipulez-la par les bords, les mains propres et sèches.',
    back: '← Toutes les œuvres', unique: 'Pièce unique, il n’y en a qu’une.', details: 'Détails',
    mediumLabel: 'Technique', sizeLabel: 'Format', mockNote: 'Encadrement montré à titre d’illustration.', arBtn: 'Voir chez moi', arTitle: 'Voir l’œuvre sur votre mur', arGo: 'Ouvrir la caméra', arHelp: 'Pointez un mur et bougez lentement le téléphone jusqu’à ce que l’œuvre s’y accroche. Elle apparaît à sa vraie grandeur : glissez pour la déplacer, pincez pour l’agrandir. Astuce : un mur avec un peu de texture ou un cadre déjà accroché aide la caméra.', arDesktop: 'Ouvrez cette page sur votre téléphone pour voir l’œuvre sur votre mur, à sa vraie grandeur.', arNote: 'Cadre montré à titre d’illustration.', close: 'Fermer', arPhoto: 'Essayer avec une photo de mon mur', arTake: 'Prendre une photo', arPick: 'Choisir dans mes photos', arPhotoHelp: 'Glissez l’œuvre pour la placer. Pincez (ou utilisez le curseur) pour ajuster la grandeur, et tournez deux doigts pour l’incliner.', arRotate: 'Tourner la photo', arRotatePiece: 'Tourner l’œuvre', arTwist: 'Ou tournez deux doigts sur l’œuvre.', arSize: 'Grandeur', arChange: 'Changer de photo', arSave: 'Enregistrer l’image', arBack: 'Vue 3D',
    demoBuy: 'Aperçu : le paiement sera actif une fois Stripe branché.', notFound: 'Œuvre introuvable.',
    contactText: 'Une question sur une œuvre ou envie d’une commande personnalisée?',
    secure: 'Paiement sécurisé par Stripe',
    seeWorks: 'Voir les œuvres', close: 'Fermer', arPhoto: 'Essayer avec une photo de mon mur', arTake: 'Prendre une photo', arPick: 'Choisir dans mes photos', arPhotoHelp: 'Glissez l’œuvre pour la placer. Pincez (ou utilisez le curseur) pour ajuster la grandeur, et tournez deux doigts pour l’incliner.', arSize: 'Grandeur', arChange: 'Changer de photo', arSave: 'Enregistrer l’image', arBack: 'Vue 3D', lang: 'EN',
  },
  en: {
    navWorks: 'Works', navAbout: 'About', navContact: 'Contact',
    heroTitle: 'Abstract watercolours.<br><em>One of each.</em>',
    heroSub: 'Original paintings by Alexandra Paige. Every piece is one of a kind: once it finds its home, it’s gone.',
    filterAvailable: 'Available', filterAll: 'All',
    demo: 'Preview — pieces from the Etsy shop, checkout not live yet',
    empty: 'No pieces available right now. Check back soon!',
    buy: 'Buy this piece', sold: 'Sold', soldOut: 'Sold',
    soldNote: 'This piece has found its home. Write to me if you like this style.',
    shippingTitle: 'Shipping',
    prev: 'Previous photo', next: 'Next photo',
    collection: 'Collection', aboutRead: 'Read my story →', aboutTitle: 'About the artist', aboutCta: 'See the work',
    originalLabel: 'Artwork', originalVal: 'Original painting (not a print)', paperLabel: 'Paper', paperVal: 'Heavyweight cold-pressed watercolour paper, 140 lb / 300 gsm', signedLabel: 'Signature', signedVal: 'Signed by the artist on the back', presLabel: 'Presentation', presMatted: 'Unframed. Arrives in an 8 × 10 in (20.3 × 25.4 cm) mat, ready to slip into a standard frame.', presUnmatted: 'Unframed, no mat. Fits a standard 8 × 10 in (20.3 × 25.4 cm) frame.', presLarge: 'Unframed. Sized for a 19¾ × 27½ in (50 × 70 cm) frame with a 15¾ × 19¾ in (40 × 50 cm) mat opening (shown in an IKEA RÖDALM).', shipTitle: 'Shipping & packaging', shipPack: 'Ships flat in a protective cellophane sleeve.', shipNote: 'Every piece comes with a handwritten thank-you note from the artist.', shipMade: 'Hand-painted in Québec, Canada.', careTitle: 'Care', careText: 'To keep the colours vivid, display away from direct sunlight and humidity, ideally framed behind glass. Handle by the edges with clean, dry hands.',
    back: '← All works', unique: 'One of a kind: there is only one.', details: 'Details',
    mediumLabel: 'Medium', sizeLabel: 'Size', mockNote: 'Shown framed for illustration.', arBtn: 'View in your space', arTitle: 'See it on your wall', arGo: 'Open camera', arHelp: 'Point at a wall and move the phone slowly until the piece snaps onto it. It starts at its true size: drag to move it, pinch to resize. Tip: a wall with some texture or a frame already hanging helps the camera.', arDesktop: 'Open this page on your phone to see the piece on your wall, at its true size.', arNote: 'Frame shown for illustration.', close: 'Close', arPhoto: 'Try it with a photo of my wall', arTake: 'Take a photo', arPick: 'Choose from my photos', arPhotoHelp: 'Drag the piece to place it. Pinch (or use the slider) to adjust the size, and twist two fingers to tilt it.', arRotate: 'Rotate photo', arRotatePiece: 'Rotate piece', arTwist: 'Or twist two fingers on the piece.', arSize: 'Size', arChange: 'Change photo', arSave: 'Save image', arBack: '3D view',
    demoBuy: 'Preview: checkout goes live once Stripe is connected.', notFound: 'Piece not found.',
    contactText: 'A question about a piece, or interested in a commission?',
    secure: 'Secure payment by Stripe',
    seeWorks: 'See the work', close: 'Close', arPhoto: 'Try it with a photo of my wall', arTake: 'Take a photo', arPick: 'Choose from my photos', arPhotoHelp: 'Drag the piece to place it. Pinch (or use the slider) to adjust the size, and twist two fingers to tilt it.', arSize: 'Size', arChange: 'Change photo', arSave: 'Save image', arBack: '3D view', lang: 'FR',
  },
};

// ────────────────────────────────────────────────────────────
const $ = (s, el = document) => el.querySelector(s);
const state = { lang: initialLang(), filter: 'all', artworks: [], demo: false };

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
// Photos you can flip through right on a card (no need to open the listing)
function cardSlides(a) {
  const first = a.cardPhoto || a.thumb || a.image;
  const skip = new Set([first && first.split('?')[0], a.art, '/art/collection-grid.jpg']);
  const rest = (a.gallery || []).map((g) => g.src).filter((src) => !skip.has(src.split('?')[0]));
  return [first, ...rest].filter(Boolean);
}
function setupCardSlides() {
  const root = $('.collections');
  if (!root || root.dataset.slides) return;
  root.dataset.slides = '1';
  const go = (card, step) => {
    const a = state.artworks.find((x) => x.id === card.dataset.id); if (!a) return;
    const slides = cardSlides(a), n = slides.length;
    const i = (((Number(card.dataset.slide) || 0) + step) % n + n) % n;
    card.dataset.slide = i;
    const frame = $('.card-frame', card), img = $('img', frame);
    if (!frame.dataset.cls) frame.dataset.cls = frame.className;
    frame.className = i === 0 ? frame.dataset.cls : 'card-frame show-photo';
    img.className = i === 0 && frame.dataset.cls.includes('has-print') ? 'print' : '';
    img.loading = 'eager'; img.src = slides[i];
    frame.querySelectorAll('.cs-dots i').forEach((d, k) => d.classList.toggle('on', k === i));
    // warm the next photo so flipping feels instant
    const nx = new Image(); nx.src = slides[(i + 1) % n];
  };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('.cs-nav'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    go(b.closest('.card'), b.classList.contains('cs-next') ? 1 : -1);
  });
  // swipe on phones
  let sx = 0, sy = 0, swiped = false;
  root.addEventListener('touchstart', (e) => { const t0 = e.touches[0]; sx = t0.clientX; sy = t0.clientY; swiped = false; }, { passive: true });
  root.addEventListener('touchend', (e) => {
    const card = e.target.closest('.card'); if (!card || !e.target.closest('.card-frame')) return;
    const t1 = e.changedTouches[0], dx = t1.clientX - sx, dy = t1.clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { swiped = true; go(card, dx < 0 ? 1 : -1); }
  }, { passive: true });
  root.addEventListener('click', (e) => { if (swiped && e.target.closest('.card-frame')) { e.preventDefault(); swiped = false; } }, true);
}

function renderGrid() {
  const list = state.filter === 'available' ? state.artworks.filter((a) => !a.sold) : state.artworks;
  $('.demo-note').hidden = !state.demo;
  $('.empty').hidden = list.length > 0;
  const card = (a) => `
    <a class="card${a.sold ? ' is-sold' : ''}" data-id="${escapeHtml(a.id)}" href="/piece.html?p=${encodeURIComponent(a.id)}">
      <div class="card-frame${a.cardPhoto ? ' is-photo' : a.thumb ? ' has-print' : ''}">
        ${a.cardPhoto ? `<img src="${escapeHtml(a.cardPhoto)}" alt="${escapeHtml(a.title)}" loading="lazy">` : a.thumb ? `<img class="print" src="${escapeHtml(a.thumb)}" alt="${escapeHtml(a.title)}" loading="lazy">`
          : a.image ? `<img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy">` : ''}
        ${a.sold ? `<span class="badge">${t('soldOut')}</span>` : ''}
        ${cardSlides(a).length > 1 ? `
        <button type="button" class="cs-nav cs-prev" aria-label="${t('prev')}">‹</button>
        <button type="button" class="cs-nav cs-next" aria-label="${t('next')}">›</button>
        <span class="cs-dots">${cardSlides(a).map((_, i) => `<i${i ? '' : ' class="on"'}></i>`).join('')}</span>` : ''}
      </div>
      <div class="card-text">
        <div>
          <div class="card-title">${escapeHtml(a.title)}</div>
          <div class="card-sub">${escapeHtml(localized(a.cardSub) || [localized(a.medium), localized(a.dimensions)].filter(Boolean).join(' · '))}</div>
        </div>
        <div class="card-price">${money(a.price, a.currency)}</div>
      </div>
    </a>`;
  const groups = CONFIG.collections
    .map((c) => ({ c, items: list.filter((a) => (a.collection || CONFIG.defaultCollection) === c.id) }))
    .filter((g) => g.items.length);
  $('.collections').innerHTML = groups.map(({ c, items }) => `
    <section class="collection" id="${escapeHtml(c.id)}">
      <div class="collection-head">
        <p class="collection-label">${t('collection')}</p>
        <h3>${escapeHtml(localized(c.name))}</h3>
        <p class="collection-blurb">${escapeHtml(localized(c.blurb))}</p>
      </div>
      <div class="grid">${items.map(card).join('')}</div>
    </section>`).join('');
  setupCardSlides();
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
        <div class="listing-main${g.fill ? ' is-fill' : ''}">
          <img src="${escapeHtml(g.src)}" alt="${escapeHtml(a.title)}">
          ${gallery.length > 1 ? `
          <button type="button" class="nav prev" aria-label="${t('prev')}">‹</button>
          <button type="button" class="nav next" aria-label="${t('next')}">›</button>
          <span class="counter">${current + 1} / ${gallery.length}</span>` : ''}
        </div>
        <p class="mock-note"${g.mock ? '' : ' hidden'}>${t('mockNote')}</p>
        ${gallery.length > 1 ? `<div class="thumbs">${gallery.map((x, i) => `
          <button type="button" class="thumb${i === current ? ' on' : ''}" data-i="${i}" aria-label="${i + 1}/${gallery.length}">
            <img src="${escapeHtml(x.src)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
      </div>
      <div class="listing-info">
        ${(() => { const c = CONFIG.collections.find((x) => x.id === (a.collection || CONFIG.defaultCollection));
          return c ? `<a class="listing-collection" href="/#${escapeHtml(c.id)}">${escapeHtml(localized(c.name))}</a>` : ''; })()}
        <h1>${escapeHtml(a.title)}</h1>
        <p class="listing-price">${a.sold ? t('sold') : money(a.price, a.currency)}</p>
        <p class="listing-unique">${a.sold ? t('soldNote') : t('unique')}</p>
        ${a.sold || !a.url ? '' : `<a class="buy" href="${escapeHtml(a.url)}">${t('buy')}</a>`}
        <p class="demo-buy" hidden>${t('demoBuy')}</p>
        ${a.sold ? '' : `<button type="button" class="ar-open"><span aria-hidden="true">◳</span> ${t('arBtn')}</button>`}
        <div class="listing-desc">${[].concat(localized(a.description) || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</div>
        <h2>${t('details')}</h2>
        <dl class="listing-details">
          <dt>${t('originalLabel')}</dt><dd>${t('originalVal')}</dd>
          ${a.dimensions ? `<dt>${t('sizeLabel')}</dt><dd>${escapeHtml(localized(a.dimensions))}</dd>` : ''}
          ${a.medium ? `<dt>${t('mediumLabel')}</dt><dd>${escapeHtml(localized(a.medium))}</dd>` : ''}
          <dt>${t('paperLabel')}</dt><dd>${t('paperVal')}</dd>
          <dt>${t('signedLabel')}</dt><dd>${t('signedVal')}</dd>
          <dt>${t('presLabel')}</dt><dd>${a.large ? t('presLarge') : a.matted === false ? t('presUnmatted') : t('presMatted')}</dd>
        </dl>
        <details class="listing-more" open>
          <summary>${t('shipTitle')}</summary>
          <ul>
            <li>${escapeHtml(CONFIG.shipping[state.lang])}</li>
            <li>${t('shipPack')}</li>
            <li>${t('shipNote')}</li>
            <li>${t('shipMade')}</li>
          </ul>
        </details>
        <details class="listing-more">
          <summary>${t('careTitle')}</summary>
          <p>${t('careText')}</p>
        </details>
        <p class="listing-secure">${t('secure')}</p>
      </div>
    </div>`;
  setupAR(root, a);
  // Photo carousel: arrows, thumbnails, swipe and keyboard all go through show()
  const main = $('.listing-main', root);
  const show = (i) => {
    const n = gallery.length;
    state.slide = ((i % n) + n) % n;
    const x = gallery[state.slide];
    $('img', main).src = x.src;
    main.classList.toggle('is-fill', Boolean(x.fill));
    $('.mock-note', root).hidden = !x.mock;
    const counter = $('.counter', main); if (counter) counter.textContent = `${state.slide + 1} / ${n}`;
    root.querySelectorAll('.thumb').forEach((b, k) => b.classList.toggle('on', k === state.slide));
    [state.slide + 1, state.slide - 1].forEach((k) => { const im = new Image(); im.src = gallery[((k % n) + n) % n].src; });
  };
  state.showSlide = show;
  root.querySelectorAll('.thumb').forEach((b) => b.addEventListener('click', () => show(+b.dataset.i)));
  $('.prev', root)?.addEventListener('click', () => show(state.slide - 1));
  $('.next', root)?.addEventListener('click', () => show(state.slide + 1));
  let x0 = null;
  main.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  main.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(state.slide + (dx < 0 ? 1 : -1));
  });
  show(current);
  const buy = $('.buy', root);
  if (buy && state.demo) buy.addEventListener('click', (e) => { e.preventDefault(); $('.demo-buy', root).hidden = false; });
}

// ── About page ──────────────────────────────────────────────
function renderAboutPage() {
  const root = $('.about-page');
  const p = CONFIG.aboutPage;
  const img = p.photo || '/art/forest-walk-matted.jpg';
  document.title = `${t('aboutTitle')} · ArtBy APL`;
  root.innerHTML = `
    <div class="about-hero">
      <div class="about-photo${p.photo ? ' is-portrait' : ''}"><img src="${escapeHtml(img)}" alt="${p.photo ? escapeHtml(CONFIG.name) : ''}"></div>
      <div class="about-intro">
        <p class="collection-label">${t('aboutTitle')}</p>
        <h1>${escapeHtml(CONFIG.name)}</h1>
        <p class="about-tagline">${escapeHtml(localized(CONFIG.tagline))}</p>
        <div class="about-bio">${p.bio.map((x) => `<p>${escapeHtml(localized(x))}</p>`).join('')}</div>
        <p class="about-actions">
          <a class="hero-cta" href="/#oeuvres">${t('aboutCta')}</a>
          ${CONFIG.instagram ? `<a class="about-ig" href="${escapeHtml(CONFIG.instagram)}" target="_blank" rel="noopener">Instagram ↗</a>` : ''}
        </p>
      </div>
    </div>
    ${(p.photos || []).length ? `<div class="about-photos">${p.photos.map((src) => `<img src="${escapeHtml(src)}" alt="${escapeHtml(CONFIG.name)}" loading="lazy">`).join('')}</div>` : ''}
    <div class="about-strip">${['forest-walk', 'soft-pinks', 'deep-blues', 'violet-green'].map((sl) =>
      `<a href="/piece.html?p=${sl}"><img src="/art/${sl}-sm.jpg" alt="" loading="lazy"></a>`).join('')}</div>`;
}

// ── Data ────────────────────────────────────────────────────
// Stripe Payment Link for each piece (one sale each). Created in Allie's Stripe account.
const BUY = {
  'forest-walk': 'https://buy.stripe.com/aFa3cxa5Y6Aw9eWaww8g00k',
  'deep-blues': 'https://buy.stripe.com/3cI14pfqi0c8cr80VW8g00l',
  'mystic-purple': 'https://buy.stripe.com/00weVf3HAgb6bn49ss8g00m',
  'autumn-hues-circular': 'https://buy.stripe.com/eVqaEZ6TM7EAfDk8oo8g00n',
  'mountain-landscape': 'https://buy.stripe.com/cNi6oJgumgb6dvc5cc8g00o',
  'soft-pinks': 'https://buy.stripe.com/4gM7sNa5Y5ws62K5cc8g00p',
  'violet-green': 'https://buy.stripe.com/14A00la5Y0c89eW8oo8g00q',
  'tidal-blues': 'https://buy.stripe.com/eVq6oJba28IE2Qy5cc8g00r',
  'purple-hues-rectangular': 'https://buy.stripe.com/6oUcN7ce6gb6cr86gg8g00s',
  'blue-hues-rectangular': 'https://buy.stripe.com/eVqbJ36TMe2Y0IqfQQ8g00t',
  'autumn-hues-rectangular': 'https://buy.stripe.com/14A00la5YcYU2QybAA8g00u',
  'purple-hues-circular': 'https://buy.stripe.com/5kQ7sN7XQ6Aw2QydII8g00v',
  'teal-hues': 'https://buy.stripe.com/14AcN7a5Y6Aw2Qyaww8g00w',
  'violet-hues': 'https://buy.stripe.com/00wcN77XQaQM1Muaww8g00x',
  'pink-hues': 'https://buy.stripe.com/fZu14p7XQ9MIfDk8oo8g00y',
  'blue-hues-circular': 'https://buy.stripe.com/dRm28tgum7EAbn49ss8g00z',
  'warm-hues': 'https://buy.stripe.com/28E4gBfqiaQM4YGdII8g00A',
  'orange-hues': 'https://buy.stripe.com/9B6eVf3HA6Awezg0VW8g00B',
  'purple-blues': 'https://buy.stripe.com/cNi6oJ6TM1gc8aS0VW8g00C',
  'blues-hues': 'https://buy.stripe.com/dRm3cxba27EA1Mu6gg8g00D',
};

// "View in your space": true-size 3D model of the framed piece, placed on a wall with the phone camera
function setupAR(root, a) {
  const btn = $('.ar-open', root); if (!btn) return;
  btn.addEventListener('click', async () => {
    if (!customElements.get('model-viewer')) {
      await new Promise((ok, ko) => { const sc = document.createElement('script'); sc.type = 'module';
        sc.src = '/vendor/model-viewer.min.js?v=1794689770'; sc.onload = ok; sc.onerror = ko; document.head.appendChild(sc); });
    }
    let dlg = $('#ar-dialog');
    if (dlg) dlg.remove();
    dlg = document.createElement('dialog'); dlg.id = 'ar-dialog'; dlg.className = 'ar-dialog';
    dlg.innerHTML = `
      <div class="ar-head"><h2>${t('arTitle')}</h2><button type="button" class="ar-close" aria-label="${t('close')}">×</button></div>
      <model-viewer src="/art/3d/${escapeHtml(a.model || a.id)}.glb" alt="${escapeHtml(a.title)}"
        ar ar-modes="webxr scene-viewer quick-look" ar-placement="wall" ar-scale="auto"
        camera-controls disable-zoom disable-pan touch-action="none" camera-orbit="-18deg 82deg auto" shadow-intensity="0.8"
        exposure="1.15" environment-image="neutral" interaction-prompt="none">
        <button slot="ar-button" class="ar-go">${t('arGo')}</button>
      </model-viewer>
      <div class="wall" hidden>
        <canvas class="wall-canvas"></canvas>
        <label class="wall-size">${t('arSize')} <input type="range" min="4" max="90" value="22"></label>
        <div class="wall-actions"><button type="button" class="wall-rotate">↻ ${t('arRotate')}</button>
          <button type="button" class="wall-change">${t('arChange')}</button>
          <button type="button" class="wall-save">${t('arSave')}</button>
          <button type="button" class="wall-back">${t('arBack')}</button></div>
        <p class="ar-help">${t('arPhotoHelp')}</p>
      </div>
      <div class="ar-3d-text">
        <div class="wall-actions"><button type="button" class="ar-rotate">↻ ${t('arRotatePiece')}</button></div>
        <p class="ar-help ar-twist">${t('arTwist')}</p>
        <p class="ar-help">${t('arHelp')}</p>
        <p class="ar-desktop" hidden>${t('arDesktop')}</p>
      </div>
      <div class="wall-pick">
        <p class="wall-pick-title">${t('arPhoto')}</p>
        <div class="wall-pick-btns">
          <label class="wall-btn wall-btn-main">📷 ${t('arTake')}<input type="file" accept="image/*" capture="environment" hidden></label>
          <label class="wall-btn">🖼️ ${t('arPick')}<input type="file" accept="image/*" hidden></label>
        </div>
      </div>
      <p class="ar-note">${t('arNote')}</p>`;
    document.body.appendChild(dlg);
    const mv = $('model-viewer', dlg);
    const close = () => { dlg.close(); dlg.remove(); };
    $('.ar-close', dlg).addEventListener('click', close);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
    dlg.showModal();
    // no AR on this device (desktop): say so instead of the camera button
    setTimeout(() => { if (!mv.canActivateAR) { $('.ar-3d-text .ar-help:not(.ar-twist)', dlg).hidden = true; $('.ar-desktop', dlg).hidden = false; } }, 1200);
    // turn the piece a quarter turn at a time (it shows up turned the same way when placed on the wall)
    // roll = how the piece is turned. The preview turns it instantly; then, once it settles, the 3D file itself
    // is swapped for one with the turn built in (from /api/glb), because the phone's AR camera loads the file, not the preview.
    let roll = 0, baked = 0, pending = null, settle = 0;
    const show = () => { mv.orientation = `${roll - baked}deg 0deg 0deg`; };
    mv.addEventListener('load', () => { if (pending !== null) { baked = pending; pending = null; show(); } });
    let inAR = false;
    const bake = () => { clearTimeout(settle); if (inAR) return; settle = setTimeout(() => {
      const want = Math.round(roll), r = ((want % 360) + 360) % 360;
      if (r === ((baked % 360) + 360) % 360 && pending === null) { baked = want; show(); return; }
      pending = want; mv.src = r ? `/api/glb/${encodeURIComponent(a.model || a.id)}.glb?roll=${r}` : `/art/3d/${encodeURIComponent(a.model || a.id)}.glb`;
    }, 350); };
    const setRoll = (r) => { roll = r; show(); bake(); };
    // in the camera view, twisting two fingers turns the piece flat against the wall (patched into /vendor/model-viewer.min.js)
    let arTurn = null;
    mv.addEventListener('ar-status', (e) => {
      inAR = e.detail.status === 'session-started';
      if (!inAR) { arTurn = null; bake(); }
    });
    mv.addEventListener('ar-twist', (e) => {
      if (arTurn === null) arTurn = roll;
      arTurn += e.detail * 180 / Math.PI;
      const snap = Math.round(arTurn / 90) * 90;
      setRoll(Math.abs(arTurn - snap) < 5 ? snap : arTurn);
    });
    $('.ar-rotate', dlg).addEventListener('click', () => {
      setRoll((Math.round(roll / 90) * 90 - 90) % 360);
      if (mv.updateFraming) mv.updateFraming();
    });
    // or twist two fingers on the 3D view (one finger still spins the view around the piece)
    let tw = null;
    const twAngle = (t) => Math.atan2(t[1].clientY - t[0].clientY, t[1].clientX - t[0].clientX) * 180 / Math.PI;
    const twStart = (e) => { if (e.touches.length === 2) { tw = { a: twAngle(e.touches), roll }; e.preventDefault(); } };
    const twMove = (e) => {
      if (!tw || e.touches.length !== 2) return;
      e.preventDefault(); e.stopPropagation();
      let d = twAngle(e.touches) - tw.a; d = ((d + 540) % 360) - 180;
      let r = tw.roll - d; const snap = Math.round(r / 90) * 90;
      if (Math.abs(r - snap) < 5) r = snap;   // clicks into straight / quarter turns
      setRoll(r);
    };
    const twEnd = (e) => { if (tw && e.touches.length < 2) { tw = null; if (mv.updateFraming) mv.updateFraming(); } };
    mv.addEventListener('touchstart', twStart, { capture: true, passive: false });
    mv.addEventListener('touchmove', twMove, { capture: true, passive: false });
    mv.addEventListener('touchend', twEnd, true); mv.addEventListener('touchcancel', twEnd, true);
    setupWallPhoto(dlg, a, mv);
  });
}

// "Try it with a photo of my wall": place the framed piece on the buyer's own photo, drag + pinch, save
function setupWallPhoto(dlg, a, mv) {
  const wall = $('.wall', dlg), cv = $('.wall-canvas', wall), ctx = cv.getContext('2d');
  const inputs = [...dlg.querySelectorAll('.wall-pick input')], input = inputs[1], slider = $('.wall-size input', wall);
  const art = new Image(); art.src = `/art/framed/${a.model || a.id}.jpg`;
  let photo = null, orig = null, turns = 0, pos = { x: 0.5, y: 0.42 }, size = 0.22, ang = 0;   // size = frame width / photo width, ang = piece tilt (rad)
  // the wall photo, turned by 90° steps (for photos that come in sideways); capped so phones don't run out of canvas memory
  const turn = () => {
    const k = Math.min(1, 2400 / Math.max(orig.width, orig.height)), w = Math.round(orig.width * k), h = Math.round(orig.height * k);
    if (turns % 4 === 0 && k === 1) { photo = orig; return; }
    const c = document.createElement('canvas'), side = turns % 2 === 1;
    c.width = side ? h : w; c.height = side ? w : h;
    const g = c.getContext('2d'); g.translate(c.width / 2, c.height / 2); g.rotate(turns * Math.PI / 2); g.drawImage(orig, -w / 2, -h / 2, w, h);
    photo = c;
  };
  const fit = () => {
    const box = mv.getBoundingClientRect().width || dlg.clientWidth - 36;
    const maxH = Math.min(window.innerHeight * 0.58, 520);
    let w = box, h = w * photo.height / photo.width;
    if (h > maxH) { h = maxH; w = h * photo.width / photo.height; }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.style.width = w + 'px'; cv.style.height = h + 'px'; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  };
  const draw = (c = ctx, W = cv.width, H = cv.height) => {
    if (!photo) return;
    c.drawImage(photo, 0, 0, W, H);
    if (!art.complete || !art.naturalWidth) return;
    const w = size * W, h = w * art.naturalHeight / art.naturalWidth;
    c.save(); c.translate(pos.x * W, pos.y * H); c.rotate(ang); c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = w * 0.06; c.shadowOffsetX = w * 0.015; c.shadowOffsetY = w * 0.03;
    c.drawImage(art, -w / 2, -h / 2, w, h); c.restore();
  };
  art.onload = () => draw();
  const show = (on) => { wall.hidden = !on; mv.hidden = on; $('.ar-3d-text', dlg).hidden = on; $('.wall-pick', dlg).hidden = on; };
  inputs.forEach((inp) => inp.addEventListener('change', () => {
    const f = inp.files && inp.files[0]; if (!f) return;
    const img = new Image();
    img.onload = () => { orig = img; turns = 0; ang = 0; turn(); show(true); fit(); draw(); inp.value = ''; };
    img.src = URL.createObjectURL(f);
  }));
  $('.wall-change', wall).addEventListener('click', () => { wall.hidden = true; $('.wall-pick', dlg).hidden = false; });
  $('.wall-back', wall).addEventListener('click', () => show(false));
  $('.wall-rotate', wall).addEventListener('click', () => {
    const oldW = photo.width; turns = (turns + 1) % 4; turn();
    pos = { x: 1 - pos.y, y: pos.x };   // keep the piece on the same spot of the wall, at the same size
    size = Math.min(0.9, Math.max(0.04, size * oldW / photo.width)); slider.value = Math.round(size * 100);
    fit(); draw();
  });
  slider.addEventListener('input', () => { size = slider.value / 100; draw(); });
  // drag with one pointer, pinch with two
  const pts = new Map(); let start = null;
  const rel = (e) => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }; };
  const dist = () => { const [p, q] = [...pts.values()]; return Math.hypot(p.x - q.x, (p.y - q.y) * cv.height / cv.width); };
  const angle = () => { const [p, q] = [...pts.values()]; return Math.atan2((q.y - p.y) * cv.height / cv.width, q.x - p.x); };
  cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, rel(e));
    start = { pos: { ...pos }, size, ang, p: rel(e), d: pts.size === 2 ? dist() : 0, a: pts.size === 2 ? angle() : 0 }; });
  cv.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, rel(e));
    if (pts.size === 1) { const p = rel(e); pos = { x: Math.min(1, Math.max(0, start.pos.x + p.x - start.p.x)), y: Math.min(1, Math.max(0, start.pos.y + p.y - start.p.y)) }; }
    else if (pts.size === 2 && start.d) {
      size = Math.min(0.9, Math.max(0.04, start.size * dist() / start.d)); slider.value = Math.round(size * 100);
      let d = angle() - start.a; d = Math.atan2(Math.sin(d), Math.cos(d));
      ang = start.ang + d; if (Math.abs(ang) < 0.05) ang = 0;   // snaps back to straight within ~3°
    }
    draw();
  });
  const up = (e) => { pts.delete(e.pointerId); const left = [...pts.values()][0];
    if (left) start = { pos: { ...pos }, size, ang, p: left, d: 0, a: 0 }; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', (e) => { e.preventDefault(); size = Math.min(0.9, Math.max(0.04, size * (e.deltaY < 0 ? 1.06 : 0.94))); slider.value = Math.round(size * 100); draw(); }, { passive: false });
  $('.wall-save', wall).addEventListener('click', () => {
    const k = Math.min(1, 2000 / Math.max(photo.width, photo.height));
    const out = document.createElement('canvas'); out.width = Math.round(photo.width * k); out.height = Math.round(photo.height * k);
    draw(out.getContext('2d'), out.width, out.height);
    out.toBlob(async (blob) => {
      const file = new File([blob], `${a.id}-chez-moi.jpg`, { type: 'image/jpeg' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: a.title }); return; } catch (_) { /* fall back to download */ } }
      const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = file.name; link.click();
    }, 'image/jpeg', 0.9);
  });
}

async function load() {
  // The catalogue (photos, text, buy links) lives in this file.
  // If the Stripe key is set in Cloudflare, /api/artworks also tells us which pieces have sold.
  state.artworks = demoArtworks();
  state.demo = false;
  try {
    const res = await fetch('/api/artworks', { headers: { accept: 'application/json' } });
    const data = res.ok ? await res.json() : null;
    if (data && !data.demo && Array.isArray(data.artworks)) {
      const live = {};
      for (const a of data.artworks) { if (a.slug && (!live[a.slug] || live[a.slug].sold)) live[a.slug] = a; }
      state.artworks = state.artworks
        .filter((a) => a.sold || !Object.keys(live).length || live[a.id])   // archived in Stripe = hidden (already-sold pieces stay)
        .map((a) => (live[a.id] ? { ...a, sold: a.sold || live[a.id].sold, url: a.sold || live[a.id].sold ? null : a.url } : a));
    }
  } catch (_) { /* keep the catalogue as is */ }
  if ($('.collections')) renderGrid();
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

// Sample pieces shown until Stripe is connected: Alexandra's current Etsy listings (photos hosted by Etsy).
function demoArtworks() {
  // Alexandra's current Etsy pieces. Photos edited for the web and hosted on the site, in /art:
  //   <slug>-sm.jpg = the piece alone (cards) · <slug>.jpg = large · <slug>-styled.jpg = framed shot (detail view)
  const small = { medium: 'Watercolour', dimensions: '5×7 in · matted 8×10', price: 5200 };
  const list = [
    ['forest-walk', 'Forest Walk', 'circular'],
    ['deep-blues', 'Deep Blues', 'circular'],
    ['mystic-purple', 'Mystic Purple', 'circular'],
    ['autumn-hues-circular', 'Fallen Leaves', 'circular'],
    ['mountain-landscape', 'Mountain Landscape', 'landscape', { dimensions: '8×10 in', price: 6700 }],
    ['soft-pinks', 'Soft Pinks', 'circular'],
    ['violet-green', 'Violet & Jade', 'circular'],
    ['tidal-blues', 'Tidal Blues', 'rectangular'],
    ['purple-hues-rectangular', 'Twilight Bloom', 'rectangular'],
    ['blue-hues-rectangular', 'Lagoon', 'rectangular'],
    ['autumn-hues-rectangular', 'Harvest', 'rectangular'],
    ['purple-hues-circular', 'Lavender Fields', 'circular'],
    ['teal-hues', 'Driftwood', 'circular'],
    ['violet-hues', 'Amethyst Dusk', 'circular'],
    ['pink-hues', 'Fuchsia Bloom', 'circular'],
    ['blue-hues-circular', 'Blue Hues', 'circular'],
    ['warm-hues', 'Ember', 'circular'],
    ['orange-hues', 'Marigold', 'circular'],
    ['purple-blues', 'Midnight Plum', 'circular'],
    ['blues-hues', 'Coral Reef', 'watercolour & oil pastel', { medium: 'Watercolour & oil pastel', dimensions: '8×10 in', price: 6700 }],
    // Already sold: shown at the end with a "Sold out" label, no buy button
    ['pink-s', 'Pink S', 'circular', { sold: true }],
    ['sage-clay', 'Sage & Clay', 'rectangular', { sold: true }],
    ['blue-gold', 'Blue & Gold', 'circular', { sold: true }],
    ['moss-cobalt', 'Moss & Cobalt', 'circular', { sold: true }],
    ['blue-peak', 'Blue Peak', 'circular', { sold: true }],
    // Large format (40 × 50 cm, for a 50 × 70 cm frame with mat)
    ['sky-ochre', 'Sky & Ochre', 'circular', { sold: true, large: true, price: 8500 }],
    ['moss-rain', 'Moss & Rain', 'circular', { sold: true, large: true, price: 8500 }],
    ['tide-pool', 'Rock Pool', 'rectangular', { sold: true, large: true, price: 8500 }],
    ['sorbet', 'Sorbet', 'rectangular', { sold: true, large: true, price: 8500 }],
  ];
  // Listing photo set for every piece: the piece, in its mat, on the sideboard, on the gallery wall,
  // the collection grid, and Alexandra's own framed photo. Room photos are free Unsplash photos.
  // Pieces with Alexandra's own new photos (colour-corrected, light oak dresser)
  const updated = ['tide-pool', 'sorbet', 'blue-peak', 'sky-ochre', 'moss-rain', 'pink-s', 'sage-clay', 'blue-gold', 'moss-cobalt', 'purple-hues-circular', 'mountain-landscape', 'warm-hues', 'orange-hues', 'purple-blues', 'forest-walk', 'mystic-purple', 'soft-pinks', 'pink-hues', 'violet-hues', 'autumn-hues-circular', 'teal-hues', 'violet-green', 'blue-hues-circular', 'deep-blues'];
  const largeSet = (slug) => [
    { src: `/art/${slug}-photo1.jpg?v=5`, fill: true },
    { src: `/art/${slug}-room.jpg?v=5`, mock: true, fill: true },
    { src: `/art/${slug}-photo3.jpg?v=5`, fill: true },
    { src: `/art/${slug}.jpg?v=5` },
    { src: `/art/${slug}-matted.jpg?v=5`, fill: true },
  ];
  const isLarge = (slug) => ['sky-ochre', 'moss-rain', 'tide-pool', 'sorbet'].includes(slug);
  const setFor = (slug) => isLarge(slug) ? largeSet(slug) : [
    { src: `/art/${slug}-photo1.jpg?v=8`, fill: true },
    { src: `/art/${slug}-photo3.jpg?v=6`, fill: true },
    { src: `/art/${slug}.jpg` },
    { src: `/art/${slug}-matted.jpg`, fill: true },
    { src: `/art/${slug}-sideboard.jpg`, mock: true, fill: true },
    // Mountain Landscape is a different kind of piece (8×10, no mat): no gallery wall, no collection grid
    ...(['mountain-landscape', 'blue-peak'].includes(slug) ? [] : [
      { src: `/art/${slug}-gallery-wall.jpg`, mock: true, fill: true },
      { src: '/art/collection-grid.jpg', fill: true },
    ]),
  ];
  const customGallery = Object.fromEntries(updated.map((slug) => [slug, setFor(slug)]));
  const listingGallery = (slug) => customGallery[slug] || [
    { src: `/art/${slug}.jpg` },
    { src: `/art/${slug}-matted.jpg`, fill: true },
    { src: `/art/${slug}-sideboard.jpg`, mock: true, fill: true },
    // Blues Hues (8×10, painted edge to edge) doesn't belong on the gallery wall / collection grid of small circles
    ...(slug === 'blues-hues' ? [] : [
      { src: `/art/${slug}-gallery-wall.jpg`, mock: true, fill: true },
      { src: '/art/collection-grid.jpg', fill: true },
    ]),
    { src: `/art/${slug}-styled.jpg`, fill: true },
  ];
  // Per-piece story (first paragraph of each listing), in English and French.
  const stories = {
    'forest-walk': ['Deep teals and mossy greens drift between warm ochre and earthy brown, like light filtering through a forest canopy. Stippled shapes and fine pencil lines reveal themselves the closer you look.',
      'Des sarcelles profonds et des verts mousse dérivent entre l’ocre chaud et le brun terreux, comme la lumière qui filtre à travers les arbres. Pointillés et fins traits de crayon se révèlent à mesure qu’on s’approche.'],
    'deep-blues': ['Cobalt, ultramarine and navy pool together with flashes of olive and gold. Scattered brushmarks and hand-drawn swirls give it the feeling of moving water on a bright day.',
      'Le cobalt, l’outremer et le marine se rassemblent, ponctués d’éclats d’olive et d’or. Touches de pinceau et spirales dessinées à la main évoquent l’eau en mouvement par une journée lumineuse.'],
    'mystic-purple': ['Rich violet and magenta bloom alongside deep emerald and smoky plum. Dotted textures and soft spirals give this piece a quiet, dreamlike energy.',
      'Le violet profond et le magenta s’épanouissent aux côtés d’un émeraude foncé et d’un prune fumé. Textures pointillées et douces spirales donnent à l’œuvre une énergie calme, presque onirique.'],
    'autumn-hues-circular': ['Crimson, burnt orange and amber gather like fallen leaves, grounded by touches of deep brown. Tiny dashes and hand-drawn patterns echo the rhythm of a crisp fall walk.',
      'Cramoisi, orange brûlé et ambre se rassemblent comme des feuilles tombées, ancrés par quelques touches de brun foncé. Petits traits et motifs dessinés à la main rappellent le rythme d’une promenade d’automne.'],
    'mountain-landscape': ['Inspired by mountain horizons, flowing water and the beauty of natural landscapes, this dreamy, expressive mountainscape is held within a soft circle. Golden slopes, a coral peak and deep teal water are built up in rich layers of colour, organic textures and hand-drawn details.',
      'Inspiré des horizons de montagnes, de l’eau qui coule et de la beauté des paysages, ce paysage rêveur et expressif est contenu dans un cercle tout en douceur. Pentes dorées, sommet corail et eaux sarcelle profondes sont construits en riches couches de couleur, de textures organiques et de détails dessinés à la main.'],
    'soft-pinks': ['Blush, rose and soft fuchsia float across the circle with hints of peach and plum. Light and airy, with delicate marks that keep the eye wandering.',
      'Rose pâle, vieux rose et fuchsia doux flottent dans le cercle avec des notes de pêche et de prune. Une œuvre légère et aérienne, aux marques délicates qui invitent le regard à se promener.'],
    'violet-green': ['Saturated violet meets jade and teal, with touches of slate blue. Rows of tiny marks and a few hand-drawn arcs bring a gentle rhythm to the bold colour.',
      'Un violet intense rencontre le jade et le sarcelle, avec quelques touches de bleu ardoise. Rangées de petites marques et arcs dessinés à la main donnent un rythme doux à ces couleurs franches.'],
    'tidal-blues': ['Sea green, slate blue and olive wash across the page from edge to edge, like a tide pulling back over the sand. Layers of dots, dashes and coloured-pencil texture add depth the closer you look.',
      'Vert océan, bleu ardoise et olive couvrent la feuille d’un bord à l’autre, comme une marée qui se retire sur le sable. Points, traits et textures au crayon de couleur ajoutent de la profondeur à mesure qu’on s’approche.'],
    'purple-hues-rectangular': ['Bright cerulean and violet run into magenta and warm gold across the full sheet. Swirls, stippling and crayon textures fill the spaces in between.',
      'Un bleu céruléen éclatant et le violet se fondent dans le magenta et l’or chaud, sur toute la feuille. Spirales, pointillés et textures au pastel remplissent les espaces entre les formes.'],
    'blue-hues-rectangular': ['Turquoise, cobalt and deep teal flow edge to edge, with leaf-like strokes and fine concentric swirls. Fresh and calming, like looking down into clear water.',
      'Turquoise, cobalt et sarcelle profond s’étendent d’un bord à l’autre, avec des touches en forme de feuilles et de fines spirales concentriques. Une œuvre fraîche et apaisante, comme un regard plongé dans une eau claire.'],
    'autumn-hues-rectangular': ['Coral, terracotta and mustard sit against deep forest green across the full sheet. Gold spirals, crimson lines and dense dotted patterns give it a warm, layered richness.',
      'Corail, terre cuite et moutarde côtoient un vert forêt profond sur toute la feuille. Spirales dorées, lignes cramoisies et motifs pointillés lui donnent une richesse chaleureuse, tout en couches.'],
    'purple-hues-circular': ['Lavender, violet and periwinkle drift through the circle with touches of warm ochre. Soft line-drawn spirals and dashes keep it light and playful.',
      'Lavande, violet et pervenche dérivent dans le cercle, avec quelques touches d’ocre chaud. De douces spirales et petits traits dessinés à la main la gardent légère et ludique.'],
    'teal-hues': ['Indigo, cobalt and soft teal mingle with warm chestnut and sepia. Fine copper lines and rows of little marks carry the eye around the circle.',
      'Indigo, cobalt et sarcelle doux se mêlent à des bruns châtaigne et sépia. De fines lignes cuivrées et des rangées de petites marques guident le regard tout autour du cercle.'],
    'violet-hues': ['Cobalt and sapphire wash into plum and magenta, warmed by hints of amber. Rhythmic dashes and hand-drawn spirals trace the edge of the circle.',
      'Le cobalt et le saphir se fondent dans le prune et le magenta, réchauffés par des notes d’ambre. Traits rythmés et spirales dessinées à la main suivent le contour du cercle.'],
    'pink-hues': ['Hot pink, scarlet and sunny yellow burst across the circle, cooled by touches of lilac. Bold, joyful and full of energy.',
      'Rose vif, écarlate et jaune soleil éclatent dans le cercle, adoucis par quelques touches de lilas. Une œuvre audacieuse, joyeuse et pleine d’énergie.'],
    'blue-hues-circular': ['Aqua, teal and cerulean, with pops of deep green and a few dark accents. Fine swirls and leaf-like marks give it the calm of a still lake.',
      'Aqua, sarcelle et céruléen, avec des éclats de vert profond et quelques accents sombres. De fines spirales et des marques en forme de feuilles lui donnent le calme d’un lac paisible.'],
    'warm-hues': ['Fiery orange, coral and fuchsia glow beside sunlit yellow, traced with gold spirals and crimson dashes. Warm and vibrant, like the last light of a summer evening.',
      'Orange ardent, corail et fuchsia brillent à côté d’un jaune ensoleillé, parcourus de spirales dorées et de traits cramoisis. Chaleureuse et vibrante, comme la dernière lumière d’un soir d’été.'],
    'orange-hues': ['Marigold, amber and tangerine flow together with soft olive washes. Red-orange marks and fine spirals bring a sunny, upbeat energy.',
      'Souci, ambre et mandarine se fondent dans de doux lavis olive. Marques rouge orangé et fines spirales apportent une énergie ensoleillée et joyeuse.'],
    'purple-blues': ['Cobalt and royal blue melt into violet and plum, with rows of tiny marks and soft swirls. Moody and luminous at the same time.',
      'Le cobalt et le bleu roi se fondent dans le violet et le prune, avec des rangées de petites marques et de douces spirales. À la fois profonde et lumineuse.'],
    'blues-hues': ['Layered washes of rich blues and teals, accented with touches of yellow, green and orange, flow from edge to edge. Expressive hand-drawn details (swirls, dots and dashes) give it a lively sense of movement.',
      'Des lavis superposés de bleus riches et de sarcelles, rehaussés de touches de jaune, de vert et d’orange, couvrent la feuille d’un bord à l’autre. Des détails expressifs dessinés à la main (spirales, points et traits) lui donnent un vif sentiment de mouvement.'],
  };
  Object.assign(stories, {
    'pink-s': ['A bold letter S sits at the heart of this circle, outlined in soft lilac and wrapped in fuchsia, blush, plum and warm honey. White gel pen details and raised dots give it a playful, hand-made charm.',
      'Un grand S trône au cœur de ce cercle, tracé en lilas doux et entouré de fuchsia, de rose pâle, de prune et de miel chaud. Les détails au stylo gel blanc et les petits points en relief lui donnent un charme ludique, fait main.'],
    'sage-clay': ['Sage green, clay and soft butter yellow spread across the full sheet, with deep viridian accents and touches of burgundy. Earthy and calm, layered with dashes, dots and coloured-pencil texture.',
      'Vert sauge, terre cuite et jaune beurre doux couvrent toute la feuille, avec des accents viridian profonds et quelques touches de bourgogne. Une œuvre terreuse et calme, tout en traits, points et textures au crayon de couleur.'],
    'blue-gold': ['Ultramarine, slate and soft sky blue meet warm ochre and gold inside a gentle circle. Copper lines, pale gouache dots and rows of little marks give it quiet movement.',
      'L’outremer, l’ardoise et le bleu ciel doux rencontrent l’ocre chaud et l’or dans un cercle tout en douceur. Lignes cuivrées, points de gouache pâle et rangées de petites marques lui donnent un mouvement tranquille.'],
    'sky-ochre': ['A larger circle of soft cornflower, sky and slate blues, warmed by pools of ochre and honey. White gel-pen raindrops, coral threads and scattered dots drift across it with an airy, unhurried rhythm.',
      'Un plus grand cercle de bleus bleuet, ciel et ardoise, réchauffé de flaques d’ocre et de miel. Gouttes au stylo gel blanc, fils corail et points épars le traversent avec un rythme aérien, sans hâte.'],
    'moss-rain': ['Mint, seafoam and mossy olive washes float over a fine rain of hand-painted cobalt marks, grounded by touches of chocolate brown and deep forest green. Calm, detailed and endlessly layered.',
      'Des lavis menthe, écume et olive mousse flottent sur une fine pluie de marques cobalt peintes à la main, ancrés par des touches de brun chocolat et de vert forêt profond. Calme, détaillée et tout en couches.'],
    'blue-peak': ['A misty mountain landscape in cobalt and ultramarine, painted in a circle and set on a deep navy card. Layered washes, crayon texture and tiny white highlights catch the light on the peak, with a few birds drifting across the sky.',
      'Un paysage de montagne brumeux en bleu cobalt et outremer, peint dans un cercle et posé sur un carton bleu marine profond. Lavis superposés, texture au pastel et petits rehauts blancs font briller le sommet, avec quelques oiseaux qui traversent le ciel.'],
    'tide-pool': ['A larger piece painted edge to edge in turquoise, cobalt and sea green, deepening into plum and violet. White gel-pen swirls, raised dots and coral-like squiggles give it the feel of looking down into a rock pool.',
      'Une plus grande œuvre peinte d’un bord à l’autre en turquoise, cobalt et vert océan, qui plonge vers le prune et le violet. Spirales au stylo gel blanc, points en relief et motifs en forme de corail évoquent un regard plongé dans une cuvette de marée.'],
    'sorbet': ['A larger piece painted edge to edge in hot pink, fuchsia, violet and glowing lemon yellow, with touches of mint. Swirls, dashes and dots layered over soft washes make it joyful and full of energy.',
      'Une plus grande œuvre peinte d’un bord à l’autre en rose vif, fuchsia, violet et jaune citron lumineux, avec quelques touches de menthe. Spirales, traits et points superposés sur de doux lavis la rendent joyeuse et pleine d’énergie.'],
    'moss-cobalt': ['Moss green, olive and deep forest tones gather with bright cobalt and a glow of ochre gold. Raised cobalt dots, white gel-pen spirals and hand-drawn droplets give it a rich, layered texture.',
      'Vert mousse, olive et vert forêt profond se rassemblent avec un cobalt éclatant et une lueur d’ocre doré. Points de cobalt en relief, spirales au stylo gel blanc et gouttes dessinées à la main lui donnent une texture riche, tout en couches.'],
  });
  const intro = {
    abstract: { en: 'Inspired by colour, movement and the organic flow of water, each painting is created intuitively, layer by layer, so no two are ever alike.',
      fr: 'Inspirée par la couleur, le mouvement et le flot organique de l’eau, chaque peinture est créée de façon intuitive, couche par couche : il n’y en a jamais deux pareilles.' },
    landscape: { en: 'A calming piece for nature lovers, and a lovely gift for anyone who feels at home in the mountains or by the water.',
      fr: 'Une œuvre apaisante pour les amoureux de la nature, et un beau cadeau pour quiconque se sent chez soi en montagne ou au bord de l’eau.' },
  };
  const unmatted = ['mountain-landscape', 'blues-hues'];
  // Display order: by colour (blues → greens → purples → pinks → reds/oranges → warm), sold pieces mixed in
  const ORDER = ['deep-blues', 'blue-hues-rectangular', 'blues-hues', 'blue-peak', 'sky-ochre', 'blue-gold', 'teal-hues', 'blue-hues-circular', 'tide-pool',
    'tidal-blues', 'moss-cobalt', 'moss-rain', 'forest-walk', 'sage-clay', 'violet-green', 'mystic-purple', 'purple-hues-rectangular',
    'purple-blues', 'violet-hues', 'purple-hues-circular', 'soft-pinks', 'pink-s', 'pink-hues', 'sorbet', 'warm-hues', 'autumn-hues-circular',
    'orange-hues', 'autumn-hues-rectangular', 'mountain-landscape'];
  const rank = (slug) => { const i = ORDER.indexOf(slug); return i < 0 ? ORDER.length : i; };
  list.sort((a, b) => rank(a[0]) - rank(b[0]));
  const pieces = list.map(([slug, title, shape, extra = {}]) => {
    const d = { ...small, ...extra };
    const matted = !unmatted.includes(slug);
    const st = stories[slug];
    const lead = slug === 'mountain-landscape' ? intro.landscape : intro.abstract;
    const medium = slug === 'blues-hues'
      ? { en: 'Watercolour, ink and pastel', fr: 'Aquarelle, encre et pastel' }
      : { en: 'Watercolour and mixed media', fr: 'Aquarelle et techniques mixtes' };
    const shapeName = { circular: { en: 'circle', fr: 'cercle' }, rectangular: { en: 'edge to edge', fr: 'pleine page' } }[shape];
    return {
      id: slug, title, collection: 'intuitive-abstracts', currency: 'cad', sold: Boolean(extra.sold), url: extra.sold ? null : (BUY[slug] || null), year: '',
      thumb: `/art/${slug}-sm.jpg`, art: `/art/${slug}.jpg`, image: customGallery[slug] ? customGallery[slug][0].src : `/art/${slug}-styled.jpg`,
      gallery: listingGallery(slug),
      price: d.price, matted, large: Boolean(extra.large), cardPhoto: extra.large ? `/art/${slug}-card.jpg?v=5` : null,
      // Short line under each card in the grid
      cardSub: extra.large
        ? (shape === 'circular' ? { en: 'Watercolour · circle · 15¾ × 19¾ in', fr: 'Aquarelle · cercle · 15¾ × 19¾ po' } : { en: 'Watercolour · edge to edge · 15¾ × 19¾ in', fr: 'Aquarelle · pleine page · 15¾ × 19¾ po' })
        : matted
        ? { en: `Watercolour · ${shapeName.en} · 5 × 7 in, matted`, fr: `Aquarelle · ${shapeName.fr} · 5 × 7 po, avec passe-partout` }
        : { en: 'Watercolour · 8 × 10 in', fr: 'Aquarelle · 8 × 10 po' },
      medium,
      dimensions: extra.large
        ? { en: '15¾ × 19¾ in (40 × 50 cm)', fr: '15¾ × 19¾ po (40 × 50 cm)' }
        : matted
        ? { en: '5 × 7 in (12.7 × 17.8 cm), matted to 8 × 10 in (20.3 × 25.4 cm)', fr: '5 × 7 po (12,7 × 17,8 cm), passe-partout de 8 × 10 po (20,3 × 25,4 cm)' }
        : slug === 'blues-hues'
          ? { en: '8 × 10 in (20.3 × 25.4 cm), painted edge to edge', fr: '8 × 10 po (20,3 × 25,4 cm), peinte d’un bord à l’autre' }
          : { en: '8 × 10 in (20.3 × 25.4 cm), with a natural white border', fr: '8 × 10 po (20,3 × 25,4 cm), avec une bordure blanche naturelle' },
      description: st ? { en: [st[0], lead.en], fr: [st[1], lead.fr] } : null,
    };
  });
  return pieces;
}

// Hero image: the piece chosen in CONFIG.hero
function renderHero() {
  const el = document.querySelector('.hero-art');
  if (!el) return;
  const h = CONFIG.hero;
  el.innerHTML = h && h.image
    ? (h.photo
      ? `<div class="hero-photo"><img src="${escapeHtml(h.image)}" alt="${escapeHtml(h.title)}"></div>`
      : `<div class="hero-crop"><img class="print" src="${escapeHtml(h.image)}" alt="${escapeHtml(h.title)}"></div>`)
    : `<img src="${watercolour(7, ['#d93a6a', '#1d8a85', '#f2a03d', '#5b2a86', '#2fb39e'], { w: 600, h: 600, paper: 'transparent' })}" alt="">`;
}

// ── Events ──────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (!$('.listing') || !state.showSlide || e.target.closest('input, textarea')) return;
  if (e.key === 'ArrowRight') state.showSlide(state.slide + 1);
  if (e.key === 'ArrowLeft') state.showSlide(state.slide - 1);
});
document.querySelectorAll('.filters button').forEach((b) =>
  b.addEventListener('click', () => { state.filter = b.dataset.filter; renderGrid(); }));
$('.lang-toggle')?.addEventListener('click', () => {
  state.lang = state.lang === 'fr' ? 'en' : 'fr';
  try { localStorage.setItem('lang', state.lang); } catch (_) {}
  renderText();
  if ($('.collections')) renderGrid();
  if ($('.listing')) renderListing();
  if ($('.about-page')) renderAboutPage();
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
if ($('.about-page')) renderAboutPage();
fontSwitcher();
load();
