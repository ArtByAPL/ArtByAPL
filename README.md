# Art by APL — artbyapl.com

A static gallery site on Cloudflare Pages. The artworks come straight from Stripe:
**each Stripe Payment Link is one artwork.** No database, no admin panel.

```
public/            the website (HTML, CSS, JS)
  app.js           ← site settings (email, Instagram, About text) are at the top
functions/api/
  artworks.js      reads the artworks from Stripe (runs on Cloudflare)
```

---

## Adding a new piece (for the artist — about 2 minutes, works from the phone)

1. In Stripe, go to **Payment Links → + New**.
2. Choose **Products or subscriptions → + Add a new product**:
   - **Name**: the title of the piece
   - **Description**: a few lines about it
   - **Image**: a good photo of the piece (straight-on, natural light)
   - **Price**: in CAD, one-time
3. Under **Advanced options**, turn on **Limit the number of payments** and set it to **1**.
   Custom message when it's used up: *Cette œuvre a été vendue — merci! / This piece has been sold.*
4. Optional, under **After payment**: choose *Don't show confirmation page* and redirect to
   `https://artbyapl.com/merci.html`
5. Turn on **Collect customers' addresses** (shipping) and **phone number** if useful.
6. Create the link. The piece appears on the site within about a minute.

**Optional details** (shown under the title): open the product in Stripe and add
**metadata** with these keys: `medium` (e.g. *Acrylique sur toile*), `dimensions`
(e.g. *40 × 50 cm*), `year`.

| What she wants | What to do in Stripe |
|---|---|
| Piece sold | Nothing — it switches to "Vendue" automatically |
| Mark as sold (sold in person) | Deactivate its payment link |
| Hide a piece completely | Archive the product |
| Change price/photo/text | Edit the product |

---

## One-time setup

### Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `ArtByAPL/ArtByAPL`.
2. Build settings: **Framework preset: None**, **Build command: (empty)**, **Build output directory: `public`**.
3. Deploy. Then **Custom domains → Set up a custom domain → `artbyapl.com`** (and `www.artbyapl.com`).

### Stripe key (never paste it in a chat)
1. Stripe → **Developers → API keys → Create restricted key**.
2. Give it **Read** access to **Payment Links** and **Products** (everything else: None).
3. Cloudflare → your Pages project → **Settings → Variables and Secrets → Add**:
   name `STRIPE_SECRET_KEY`, type **Secret**, value = the restricted key (starts with `rk_live_`).
4. Redeploy (Deployments → ⋯ → Retry deployment).

Until the key is set, the site shows sample artworks with a "Preview" note.

### Email (free)
Cloudflare → artbyapl.com → **Email → Email Routing** → create `bonjour@artbyapl.com`
forwarding to her usual inbox.
