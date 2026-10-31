# Art by APL — artbyapl.com

A gallery site on Cloudflare Workers (static assets + one small API route).
The artworks come straight from Stripe: **each Stripe Payment Link is one artwork.**
No database, no admin panel.

```
public/            the website (HTML, CSS, JS) — served directly, free
  app.js           ← site settings (email, Instagram, About text) are at the top
src/
  worker.js        routes /api/* to the code below, everything else to public/
  stripe.js        reads the artworks from Stripe
wrangler.jsonc     Cloudflare config
```

Every push to `main` deploys automatically. Pushes to other branches (e.g. `preview`)
get their own preview URL, so changes can be reviewed before going live.

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

### Cloudflare (done)
The Worker `artbyapl` is connected to `ArtByAPL/ArtByAPL` and builds from `wrangler.jsonc`.
Temporary address: https://artbyapl.artbyapl.workers.dev

To go live on the real domain: Workers & Pages → **artbyapl → Settings → Domains & Routes → Add →
Custom domain** → `artbyapl.com` (and `www.artbyapl.com`).

### Stripe key (never paste it in a chat)
1. Stripe → **Developers → API keys → Create restricted key**.
2. Give it **Read** access to **Payment Links** and **Products** (everything else: None).
3. Cloudflare → Workers & Pages → **artbyapl → Settings → Variables and Secrets → Add**:
   type **Secret**, name `STRIPE_SECRET_KEY`, value = the restricted key (starts with `rk_live_`).
   Click **Deploy** to save it.

Until the key is set, the site shows sample artworks with a "Preview" note.

### Email (free)
Cloudflare → artbyapl.com → **Email → Email Routing** → create `bonjour@artbyapl.com`
forwarding to her usual inbox.

## Photo credits
The Forest Walk mock-ups (`public/art/forest-walk-sideboard.jpg`, `-kitchen.jpg`) place Allie's
painting into frames in free Unsplash photos (Unsplash License: free for commercial use, no attribution required):
unsplash.com/photos/ZIUPl9ASefg (sideboard), unsplash.com/photos/DaApeRy-TOg (kitchen)
Gallery wall (`public/art/forest-walk-gallery-wall.jpg`): unsplash.com/photos/jbDOyAd-lMc
